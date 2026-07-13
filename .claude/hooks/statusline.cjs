#!/usr/bin/env node
/**
 * Statusline экзокортекса — состояние в баре Claude Code (Ex-Base / Ex-Pro).
 *
 * Контракт (707-a5): per-repo хук, регистрируется в .claude/settings.json.
 * Инварианты: read-only ФС-сканер process.cwd(); zero-dep (node:fs/node:path/child_process);
 * без сети (свежесть подписок — из ЛОКАЛЬНЫХ git-метаданных); посекционный try-catch
 * (safeRun) → битая секция не роняет бар; degraded на нулях; daily ПО ИМЕНИ (не mtime);
 * headless. Репо полностью функционально БЕЗ скрипта — он опционален.
 *
 * VARIANT-driven (один файл для обоих инстансов, upstream-sync не расходится):
 *  - Ex-Base  (manifest без `variant: pro`): 4 строки — Шапка·Режим·Концепты·Очередь.
 *  - Ex-Pro   (`variant: pro`): +Режимы(4)·Подписки(boks/)·Governance(visibility).
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = process.cwd();

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m',
};
const sep = `${C.dim}│${C.reset}`;

function safeRun(label, fn) {
  try { const v = fn(); return v == null ? null : v; }
  catch { return `${C.dim}⚠ ${label}${C.reset}`; }
}
function readText(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return null; } }
function listMd(dir) {
  try { return fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.toLowerCase().endsWith('.md')); }
  catch { return []; }
}
function frontmatter(text) {
  if (!text) return {};
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\s/.test(line)) continue; // только top-level скаляры (вложенное — отдельными парсерами)
    const kv = line.match(/^([A-Za-zА-Яа-я_][\w-]*)\s*:\s*(.*?)\s*(?:#.*)?$/);
    if (kv && kv[2] !== '') fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return fm;
}

// --- модель из stdin Claude Code, иначе env, иначе "Claude" ---
function model() {
  try {
    if (!process.stdin.isTTY) {
      const raw = fs.readFileSync(0, 'utf8');
      if (raw && raw.trim()) {
        const j = JSON.parse(raw);
        const dn = j && j.model && (j.model.display_name || j.model.id);
        if (dn) return dn;
      }
    }
  } catch { /* нет stdin */ }
  return process.env.CLAUDE_MODEL || 'Claude';
}

// === СЕКЦИИ ===

function sectionHeader(man, isPro) {
  const variant = isPro ? 'Ex-Pro' : 'Ex-Base';
  const version = man.version || `V${man.schema_version || 1}`;
  let owner = man.owner || '—';
  if (/\{\{.*\}\}/.test(owner)) owner = '—';
  return `${C.bold}${variant} ${version}${C.reset} ${C.dim}●${C.reset} ${owner} ${sep} ${C.cyan}${model()}${C.reset}`;
}

// Режим: Base — константа; Pro — 4 режима + router.
function countModes(raw) {
  if (!raw) return 0;
  const lines = raw.split(/\r?\n/);
  const start = lines.findIndex((l) => /^modes:\s*$/.test(l));
  if (start < 0) return 0;
  let n = 0;
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^\S/.test(l)) break;                 // дедент к top-level → конец блока
    if (/^\s{2}\w[\w-]*:\s*\{/.test(l)) n++;   // запись режима «  key: { ... }»
  }
  return n;
}
function sectionMode(man, isPro, raw) {
  if (!isPro) return `⚙️  Режим ${sep} Исполнение`;
  const n = countModes(raw) || 4;
  const router = man.router ? `${C.green}on${C.reset}` : `${C.dim}off${C.reset}`;
  return `🧭 Режимы ${C.bold}${n}${C.reset} ${C.dim}[🔍⚙️🎓🤝]${C.reset} ${sep} router: ${router}`;
}

function sectionConcepts() {
  const files = listMd('concepts').filter((f) => f !== '_template-concept.md' && f.toLowerCase() !== 'readme.md');
  let canon = 0, draft = 0;
  for (const f of files) {
    const fm = frontmatter(readText(path.join(ROOT, 'concepts', f)));
    if (String(fm.CANONICAL).toLowerCase() === 'true') canon++;
    else if (fm.status === 'pending-author-validation') draft++;
  }
  const draftTok = draft > 0 ? `${C.yellow}draft-pending ${draft}${C.reset}` : 'draft-pending 0';
  return `📇 Concepts ${C.bold}${files.length}${C.reset} ${C.dim}(${C.reset}canon ${C.green}${canon}${C.reset} / ${draftTok}${C.dim})${C.reset}`;
}

function countNonReadme(dir) {
  try {
    return fs.readdirSync(path.join(ROOT, dir))
      .filter((f) => f.toLowerCase() !== 'readme.md' && f !== '.gitkeep' && !f.startsWith('.')).length;
  } catch { return 0; }
}
function lastDaily() {
  try {
    const days = fs.readdirSync(path.join(ROOT, 'daily'))
      .filter((f) => /^\d{4}-\d{2}-\d{2}.*\.md$/.test(f)).sort(); // ПО ИМЕНИ (канон)
    return days.length ? days[days.length - 1].slice(0, 10) : '—';
  } catch { return '—'; }
}
function countProjects() {
  const text = readText(path.join(ROOT, 'CLAUDE.md'));
  if (!text) return 0;
  const m = text.match(/<!--\s*projects-map:start\s*-->([\s\S]*?)<!--\s*projects-map:end\s*-->/);
  if (!m) return 0;
  let n = 0;
  for (const line of m[1].split(/\r?\n/)) {
    const t = line.trim();
    if (!t.startsWith('|') || /^\|\s*-+/.test(t) || /Проект\s*\|\s*Статус/i.test(t) || /пусто/i.test(t)) continue;
    n++;
  }
  return n;
}
function sectionQueue() {
  return `📥 Sources ${countNonReadme('sources')} ${sep} 🗓 Last ${lastDaily()} ${sep} 📁 Projects ${countProjects()}`;
}

// --- Pro: подписки (boks/) + свежесть из локального git (без сети) ---
function bokFreshness(id) {
  try {
    return execSync('git log -1 --format=%cs', {
      cwd: path.join(ROOT, 'boks', id), timeout: 1500, stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim() || null;
  } catch { return null; }
}
function sectionSubscriptions() {
  let dirs = [];
  try {
    dirs = fs.readdirSync(path.join(ROOT, 'boks'), { withFileTypes: true })
      .filter((d) => d.isDirectory()).map((d) => d.name);
  } catch { return null; } // нет boks/ → секции нет
  if (!dirs.length) return `🔗 Boks 0`;
  const names = dirs.join(', ');
  const fresh = bokFreshness(dirs[0]);
  const updTok = fresh ? ` ${sep} upd ${fresh}` : '';
  return `🔗 Boks ${C.bold}${dirs.length}${C.reset} ${C.dim}[${names}]${C.reset}${updTok}`;
}

// --- Pro: governance (visibility в концептах) ---
function sectionGovernance() {
  const files = listMd('concepts').filter((f) => f !== '_template-concept.md' && f.toLowerCase() !== 'readme.md');
  let priv = 0, shared = 0, curr = 0;
  for (const f of files) {
    const v = frontmatter(readText(path.join(ROOT, 'concepts', f))).visibility;
    if (v === 'shared') shared++;
    else if (v === 'curriculum') curr++;
    else priv++; // default private
  }
  return `🔒 private ${priv} / ${C.green}shared ${shared}${C.reset} / ${C.dim}curriculum ${curr}${C.reset}`;
}

// === СБОРКА ===
const rawManifest = readText(path.join(ROOT, 'manifest.yaml'));
const man = frontmatter(rawManifest ? `---\n${rawManifest}\n---` : null);
const isPro = man.variant === 'pro' || (rawManifest ? /^modes:\s*$/m.test(rawManifest) : false);

const lines = [
  safeRun('header', () => sectionHeader(man, isPro)),
  safeRun('mode', () => sectionMode(man, isPro, rawManifest)),
  safeRun('concepts', () => sectionConcepts()),
  safeRun('queue', () => sectionQueue()),
];
if (isPro) {
  lines.push(safeRun('boks', () => sectionSubscriptions()));
  lines.push(safeRun('governance', () => sectionGovernance()));
}

process.stdout.write(lines.filter((l) => l != null).join('\n') + '\n');
