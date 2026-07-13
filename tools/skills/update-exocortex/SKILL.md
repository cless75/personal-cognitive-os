---
name: update-exocortex
description: >
  Обнови экзокортекс: (A/B) подтяни последнюю версию seed — навыки, шаблоны,
  онбординг, НЕ трогая твои концепты, профиль и проекты; (C) РЕОРГАНИЗУЙ рабочий
  каталог со старой раскладки на новую модель — 7 зон + .exocortex/ (DM-EXO-7 v2).
  Use when «обнови экзокортекс», «подтяни последнюю версию», «мигрируй раскладку»,
  «реорганизуй каталог под новую модель», /update-exocortex.
kind: pipeline
version: 2
---

# Навык: обновление и реорганизация экзокортекса

Два режима: **обновление** seed-managed частей (сценарии A/B) и **миграция раскладки** (сценарий C). Работает в Claude Code (и любой среде с git). Всегда сохраняет **user-owned** контент.

## Что seed-managed, что user-owned (v2)

| Обновляется (seed-managed) | НЕ трогается (user-owned) |
|---|---|
| `tools/skills/*` (канон навыков), `.exocortex/model.md`, `.exocortex/projections/*` | `concepts/*.md` (твои карточки, кроме `_template-concept.md`) |
| проекции: `.claude/*`, `.claude-plugin/*`, `AGENTS.md` (перегенерируются `/sync-agents`) | `About-Me/*` (профиль) |
| `concepts/_template-concept.md`, `projects/_template-project.md`, `areas/_template-area.md` | `projects/<slug>/*`, `areas/*` (кроме шаблона) |
| `README.md`, `START-HERE.md`, `DEPLOY.md`, `onboarding/*`, `distributions/*`, `*/README.md`, `LICENSE`, `.gitignore` | `operation/sessions/*`, `operation/daily/*` |
| `.exocortex/manifest.yaml` — только schema-поля; значения владельца (owner, agents, tier, init_state) сохраняются | `sources/*` содержимое каналов |
| — | блок `<!-- projects-map -->` в `CLAUDE.md` |

## Шаг 0 — Диагностика установки и раскладки

1. `git remote -v`: origin = `cless75/personal-cognitive-os` (клон/форк seed) → **A**; иначе in-place → **B**.
2. **Детектор старой раскладки** (любой признак → предложи сценарий **C** прежде обновления):
   - `manifest.yaml` в корне (а не `.exocortex/manifest.yaml`);
   - каталог `daily/` в корне (а не `operation/daily/`);
   - файлы сырья прямо в `sources/*.md` (нет каналов `inbox/` и др.);
   - навыки только в `.claude/skills/` (нет `tools/skills/`).

## Сценарий A — клон/форк seed (обновление)

1. Проверь чистоту дерева (`git status`); незакоммиченные user-owned правки — предложи закоммитить/застешить.
2. `git fetch origin && git pull --no-rebase origin master`.
3. Конфликты в user-owned (`About-Me/`, `CLAUDE.md`, твои `concepts/*`) — **оставь свою версию** (`git checkout --ours <path> && git add <path>`); приоритет seed — только для seed-managed.
4. Если seed принёс новую schema_version раскладки — запусти сценарий C.
5. `/sync-agents` (перегенерация проекций) → отчёт (`git log --oneline`, `git diff --stat`).

## Сценарий B — in-place в чужом проекте (обновление)

1. Склонируй свежий seed во временный каталог (`git clone --depth 1 … <tmp>`).
2. Скопируй ТОЛЬКО seed-managed из таблицы выше. **Не копируй** содержимое user-owned зон и блок `projects-map`.
3. Удали `<tmp>`; при новой schema_version — предложи сценарий C; затем `/sync-agents` и отчёт.

## Сценарий C — миграция раскладки на новую модель (7 зон + `.exocortex/`)

**Гейт:** покажи владельцу таблицу маппинга с фактическими путями его каталога и получи явное «да». Требования: git-репозиторий (иначе предложи `git init`), чистое дерево, бэкап-тег `git tag pre-layout-migration`.

1. **Перенос (только `git mv` — история сохраняется):**
   | Старое | Новое |
   |---|---|
   | `daily/` | `operation/daily/` |
   | `sessions/` (если есть) | `operation/sessions/` |
   | `sources/*` (файлы сырья) | `sources/inbox/*` |
   | `.claude/skills/` | `tools/skills/` (канон) |
   | `manifest.yaml` | `.exocortex/manifest.yaml` |
2. **Создай недостающее:** `operation/sessions/` · каналы `sources/{inbox,mail,calendar,team-sessions,ai-sessions}/` (+`.gitkeep`) · `areas/` (+шаблон) · `tools/{mcp,bok-adaptation}/` · `.exocortex/{model.md, agents/, projections/}` — README и шаблоны бери из seed.
3. **Манифест:** добавь `tier:` (по умолчанию `base`), `schema_version: 2`, `agents:` (спроси владельца), сохранив его значения.
4. **Правка путей:** grep по каталогу на старые пути (`daily/`, `sources/` без канала, `manifest.yaml` в корне, `.claude/skills` как канон) — обнови в навыках, доках, хуках (напр. `statusline.cjs`). Чек: grep старых путей возвращает ноль (кроме исторических записей в user-контенте — их не трогай).
5. **Проекции:** `/sync-agents` → `.claude/` перегенерирован, `CLAUDE.md`/`AGENTS.md` — тонкие входы (projects-map перенесён как есть).
6. **Верификация:** дерево соответствует `.exocortex/model.md`; открой карточку концепта и карту проектов — ссылки живы; коммит `refactor: layout → 7 зон + .exocortex (schema v2)`.

**Особый случай — произвольный рабочий каталог** (не seed: свой vault, проектная папка): маппинг составь индивидуально — покажи владельцу «что куда» по духу модели (знание → `concepts/`, профиль → `About-Me/`, вход → `sources/<канал>`, дела → `projects/`/`areas/`, журналы → `operation/`), **ничего не перемещай без подтверждения каждой группы**; чужеродное (код, медиа, архивы) оставь на месте и отметь в отчёте.

## Выход

Обновлённый и/или мигрированный экзокортекс; концепты, профиль, проекты, журналы — нетронуты; отчёт: что обновлено / перемещено / сохранено.
