#!/usr/bin/env node
/**
 * Ex-Base statusline — состояние личного экзокортекса в баре Claude Code.
 *
 * Контракт (707-a5): per-repo хук, регистрируется в .claude/settings.json.
 * Инварианты: read-only ФС-сканер process.cwd(); zero-dep (только node:fs/node:path);
 * без сети; посекционный try-catch (safeRun) → битая секция не роняет бар;
 * degraded на нулях (свежий seed показывает 0/—, не падает);
 * daily берётся ПО ИМЕНИ файла (не mtime — канон); headless (чистый CLI node).
 * Репозиторий полностью функционален БЕЗ этого скрипта — он опционален.
 *
 * 4 строки Ex-Base: Шапка · Режим · Концепты · Очередь+сессия.
 * Расширяемо до Ex-Pro (режимы/подписки/governance) — см. 707-a5 §2.3.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();

// --- ANSI (посекционно, без зависимостей) ---
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m',
};
const sep = `${C.dim}│${C.reset}`;

// Каждая секция изолирована: исключение → degraded-токен, не падение бара.
function safeRun(label, fn) {
  try { return fn(); }
  catch { return `${C.dim}⚠ ${label}${C.reset}`; }
}

// --- утилиты ФС / YAML-frontmatter (мини-парсер, без yaml-dep) ---
function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}
function listMd(dir) {
  try {
    return fs.readdirSync(path.join(ROOT, dir))
      .filter((f) => f.toLowerCase().endsWith('.md'));
  } catch { return []; }
}
function frontmatter(text) {
  if (!text) return {};
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-zА-Яа-я_][\w-]*)\s*:\s*(.*?)\s*(?:#.*)?$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return fm;
}

// --- модель из stdin Claude Code (JSON), иначе env, иначе "Claude" ---
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
  } catch { /* нет stdin — не критично */ }
  return process.env.CLAUDE_MODEL || 'Claude';
}

// --- секция 1: шапка (manifest name/owner + variant/version + модель) ---
function sectionHeader(man) {
  const isPro = man.modes != null || man.subscriptions != null;
  const variant = isPro ? 'Ex-Pro' : 'Ex-Base';
  const version = man.version || `V${man.schema_version || 1}`;
  let owner = man.owner || '—';
  if (/\{\{.*\}\}/.test(owner)) owner = '—'; // ещё не персонализирован (init-me)
  return `${C.bold}${variant} ${version}${C.reset} ${C.dim}●${C.reset} ${owner} ${sep} ${C.cyan}${model()}${C.reset}`;
}

// --- секция 2: режим (Ex-Base — константа «Исполнение») ---
function sectionMode() {
  return `⚙️  Режим ${sep} Исполнение`;
}

// --- секция 3: концепты (скан concepts/, искл. _template/README) ---
function sectionConcepts() {
  const files = listMd('concepts')
    .filter((f) => f !== '_template-concept.md' && f.toLowerCase() !== 'readme.md');
  let canon = 0, draft = 0;
  for (const f of files) {
    const fm = frontmatter(readText(path.join(ROOT, 'concepts', f)));
    if (String(fm.CANONICAL).toLowerCase() === 'true') canon++;
    else if (fm.status === 'pending-author-validation') draft++;
  }
  const total = files.length;
  const draftTok = draft > 0
    ? `${C.yellow}draft-pending ${draft}${C.reset}`
    : `draft-pending 0`;
  return `📇 Concepts ${C.bold}${total}${C.reset} ${C.dim}(${C.reset}canon ${C.green}${canon}${C.reset} / ${draftTok}${C.dim})${C.reset}`;
}

// --- секция 4: очередь + последняя сессия ---
function countNonReadme(dir) {
  try {
    return fs.readdirSync(path.join(ROOT, dir))
      .filter((f) => f.toLowerCase() !== 'readme.md' && f !== '.gitkeep' && !f.startsWith('.'))
      .length;
  } catch { return 0; }
}
function lastDaily() {
  try {
    const days = fs.readdirSync(path.join(ROOT, 'daily'))
      .filter((f) => /^\d{4}-\d{2}-\d{2}.*\.md$/.test(f))
      .sort(); // ПО ИМЕНИ (канон), не mtime
    if (!days.length) return '—';
    return days[days.length - 1].slice(0, 10);
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
    if (!t.startsWith('|')) continue;                      // только строки таблицы
    if (/^\|\s*-+/.test(t)) continue;                      // разделитель |---|
    if (/Проект\s*\|\s*Статус/i.test(t)) continue;         // заголовок
    if (/пусто/i.test(t)) continue;                        // плейсхолдер «(пусто …)»
    n++;
  }
  return n;
}
function sectionQueue() {
  const sources = countNonReadme('sources');
  const projects = countProjects();
  return `📥 Sources ${sources} ${sep} 🗓 Last ${lastDaily()} ${sep} 📁 Projects ${projects}`;
}

// --- сборка ---
const man = safeRunObj(() => {
  const txt = readText(path.join(ROOT, 'manifest.yaml'));
  return frontmatter(txt && `---\n${txt}\n---`); // manifest.yaml — плоский YAML без разделителей
});
function safeRunObj(fn) { try { return fn() || {}; } catch { return {}; } }

const lines = [
  safeRun('header', () => sectionHeader(man)),
  safeRun('mode', () => sectionMode()),
  safeRun('concepts', () => sectionConcepts()),
  safeRun('queue', () => sectionQueue()),
];

process.stdout.write(lines.join('\n') + '\n');
