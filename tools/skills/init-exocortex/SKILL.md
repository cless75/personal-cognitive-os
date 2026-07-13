---
name: init-exocortex
description: >
  v2 — единый интерактивный поток инициации Personal Cognitive OS: выбор агентов →
  развертывание (новый репозиторий / in-place в существующий проект / миграция старой
  раскладки) → sync-agents → init-me → приглашение к первому концепту. Грейсфул-прерывание:
  состояние в .exocortex/manifest.yaml (init_state). Глобальный навык уровня пользователя.
  Use when «инициализируй экзокортекс», «разверни репозиторий», «добавь экзокортекс
  в этот проект», /init-exocortex.
kind: pipeline
version: 2
distribution: user-level   # ~/.claude/skills (Cowork: Upload ZIP), не репо-локально
---

# Навык: инициация Personal Cognitive OS (единый поток v2)

Доводит владельца от «ничего нет» до первого концепта без разрывов. Любой шаг можно прервать — прогресс в `.exocortex/manifest.yaml` (`init_state: seed → agents → scaffold → profile → first-concept → complete`); при повторном запуске продолжай с места остановки, ничего не перезаписывая.

## Шаг 0 — Режим (определи по контексту, подтверди выбором)

| Режим | Когда | Что делает |
|---|---|---|
| **A. Новый репозиторий** | пустая папка / «разверни мне» | clone/scaffold seed → раскладка 7 зон + `.exocortex/` |
| **B. In-place** | существующий проект (Cowork/рабочий репо) с содержимым | недеструктивно добавляет недостающие зоны, дописывает карту проектов |
| **C. Миграция** | обнаружена старая раскладка (корневые `daily/` или `manifest.yaml`, сырьё прямо в `sources/`, навыки только в `.claude/skills`) | передай в `/update-exocortex` сценарий C |

## Шаг 1 — Агенты

Спроси (multi-select): Claude Code / Claude Cowork / Cursor / Codex / другой. Запиши `agents:` в `.exocortex/manifest.yaml` (после scaffold). → `init_state: agents`.

## Шаг 2 — Развертывание

**Режим A:**
1. Параметры (AskUserQuestion): способ (clone публичного seed `github.com/cless75/personal-cognitive-os` / scaffold оффлайн) · каталог · имя.
2. `git clone <seed>` или scaffold. Подставь `{{learner}}`/`{{learner_email}}`/`{{date}}` (в `.exocortex/manifest.yaml`, `About-Me/`). `git init` + первый commit (если новый).

**Режим B (НЕДЕСТРУКТИВНО — ничего не удаляем и не перезаписываем):**
1. Скан проекта: что уже есть (`CLAUDE.md`, `concepts/`, `.claude/`, свой плагин); покажи и подтверди встраивание.
2. Подтяни seed во временный каталог (`git clone --depth 1 … <tmp>`; без сети — встроенный шаблон).
3. Встрой seed-managed: канон навыков `tools/skills/*`, системную зону `.exocortex/*`, шаблоны и README зон (`concepts/_template-concept.md`, `projects/_template-project.md`, `areas/_template-area.md`, `*/README.md`), `onboarding/*`, `distributions/*`, `DEPLOY.md`, `START-HERE.md` — копируй ТОЛЬКО отсутствующее.
4. Создай пустые user-зоны, если их нет: `concepts/`, `About-Me/about-me.md` (из шаблона), `sources/{inbox,mail,calendar,team-sessions,ai-sessions}/`, `operation/{sessions,daily}/`, `projects/`, `areas/`.
5. `CLAUDE.md` — слияние, не перезапись: допиши секцию «## Personal Cognitive OS» + блок `<!-- projects-map:start -->…<!-- projects-map:end -->`; маркеры уже есть — не дублируй. Удали `<tmp>`.

→ `init_state: scaffold`.

## Шаг 3 — Проекции

Запусти `/sync-agents`: сгенерирует `.claude/skills|commands`, `.claude-plugin/plugin.json`, `AGENTS.md`, тонкий `CLAUDE.md` (в режиме B — только дописанный блок) для всех агентов из манифеста.
- **Claude Code:** `.claude/skills` подхватываются автоматически.
- **Cowork:** напомни установить плагин/ZIP (`onboarding/surfaces.md`, `distributions/README.md`).

## Шаг 4 — Персонализация

Запусти логику `init-me` (интервью или из файла-резюме) → `About-Me/about-me.md`; существующий профиль — дополни, не затирая. Напомни про приватность (`/About-Me/` в `.gitignore` публичного форка). → `init_state: profile`.

## Шаг 5 — Такт 1 «Первый концепт»

Предложи положить документ/транскрипт в `sources/inbox/` и запустить `/review-concepts` — ценность в первый час: «из моего материала — моё знание». После первой карточки → `init_state: complete`; покажи чек-лист первых шагов (`START-HERE.md`) и предложи `/teach-me` для тура по концепциям.

## Правила

- **Автономность:** весь поток работает офлайн, без Платформы (чистый MD + git).
- **Недеструктивность:** существующие файлы не перезаписываются; user-owned зоны не трогаются.
- Один вопрос за раз; выборы — через варианты (AskUserQuestion), не свободным текстом.

## Выход

Развёрнутый (или дополненный) экзокортекс: 7 зон + `.exocortex/`, проекции выбранных агентов, заполненный профиль, владелец знает следующий шаг.
