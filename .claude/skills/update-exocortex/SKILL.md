---
name: update-exocortex
description: >
  Обнови установленный Personal Cognitive OS до последней версии seed —
  подтягивает свежие навыки, шаблоны, онбординг и доки, НЕ трогая твои концепты,
  профиль и проекты. Use when «обнови экзокортекс», «подтяни последнюю версию»,
  «обнови навыки», /update-exocortex.
kind: pipeline
---

# Навык: обновление экзокортекса до последней версии seed

Обновляет **seed-managed** части (общий каркас) и сохраняет **user-owned** (твой контент). Работает в Claude Code (и в любой среде с git).

## Что обновляется и что нет

| Обновляется (seed-managed) | НЕ трогается (user-owned) |
|---|---|
| `.claude/skills/*`, `.claude/commands/*`, `.claude-plugin/*` | `concepts/*.md` (твои карточки, кроме `_template-concept.md`) |
| `concepts/_template-concept.md`, `projects/_template-project.md` | `About-Me/*` (твой профиль) |
| `README.md`, `START-HERE.md`, `DEPLOY.md`, `onboarding/*`, `distributions/*` | `projects/<slug>/*` (твои проекты) |
| `*/README.md`, `LICENSE`, `.gitignore`, `manifest.yaml` (schema) | `sources/*`, `daily/*` |
| — | блок `<!-- projects-map -->` в `CLAUDE.md` |

## Протокол

### Шаг 1 — Определи тип установки
`git remote -v`. Если `origin` указывает на `cless75/personal-cognitive-os` (форк/клон seed) → **случай A**. Иначе (экзокортекс добавлен in-place в другой проект) → **случай B**.

### Случай A — форк/клон seed
1. Проверь чистоту дерева (`git status`). Если есть незакоммиченные правки в user-owned файлах — предупреди, предложи закоммитить/застешить.
2. `git fetch origin && git pull --no-rebase origin master`.
3. При конфликтах в user-owned файлах (`About-Me/about-me.md`, `CLAUDE.md`, твои `concepts/*`) — **оставь свою версию** (`git checkout --ours <path> && git add <path>`), приоритет у seed только для seed-managed файлов.
4. Покажи `git log --oneline` новых коммитов и `git diff --stat`.

### Случай B — in-place в чужом проекте
1. Клонируй свежий seed во временный каталог: `git clone --depth 1 https://github.com/cless75/personal-cognitive-os <tmp>`.
2. Скопируй поверх ТОЛЬКО seed-managed части из `<tmp>` в проект: `.claude/skills/`, `.claude/commands/`, `.claude-plugin/`, `concepts/_template-concept.md`, `projects/_template-project.md`, `onboarding/`, `distributions/`, `DEPLOY.md` и `*/README.md`. **Не копируй** `concepts/` (кроме шаблона), `About-Me/`, `projects/<slug>/`, `sources/`, `daily/` содержимое, и не трогай блок `projects-map` в `CLAUDE.md`.
3. Удали `<tmp>`.
4. Покажи, какие файлы обновлены (сравни версии/даты).

### Шаг 3 — Отчёт
Сводка: что обновилось (навыки/шаблоны/доки), что сохранено нетронутым, текущая версия seed (`manifest.yaml`/последний коммит). Напомни: если добавились новые навыки — в Claude Code они подхватятся сразу; в Cowork переустанови плагин/ZIP.

## Выход
Обновлённый каркас экзокортекса; твои концепты, профиль и проекты сохранены.
