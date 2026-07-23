# START HERE — карта твоего Cognitive OS

Хаб входа. Отсюда — во все ключевые артефакты и первый рабочий цикл.

## Порядок первых шагов

1. **Инициация** — `/init-exocortex` (в Cowork) *или* `git clone` + `/init-me` (вручную). См. [onboarding/01-first-review.md](onboarding/01-first-review.md).
2. **Заполни профиль** — [About-Me/about-me.md](About-Me/about-me.md) (навык `/init-me` делает это в диалоге).
3. **Первый концепт** — положи файл в [sources/inbox/](sources/inbox/) → `/review-concepts` → пройди авторское ревью → карточка в [concepts/](concepts/).
4. **Заведи проект** — `/new-project`, затем `/start-session` / `/close-session` для ведения работы.

## Ключевые артефакты

- [README.md](README.md) — что это и зачем.
- [About-Me/about-me.md](About-Me/about-me.md) — твой профиль (знания о тебе).
- [concepts/README.md](concepts/README.md) — что такое карточка концепта, статусы draft → canon.
- [onboarding/01-first-review.md](onboarding/01-first-review.md) — первый ревью, шаг за шагом.
- [onboarding/02-existing-project.md](onboarding/02-existing-project.md) — добавить экзокортекс в уже существующий проект Cowork (in-place).
- [onboarding/surfaces.md](onboarding/surfaces.md) — работать в Obsidian или в Cowork.
- [onboarding/course/00-start.md](onboarding/course/00-start.md) — ★ универсальный онбординг-курс «Обучение с ИИ + работа на платформе» (6 модулей M0–M5, self-paced).
- [.exocortex/model.md](.exocortex/model.md) — модель зон, принципы, эволюционная лестница.
- [CLAUDE.md](CLAUDE.md) — тонкий вход Claude + живая карта проектов.

## Команды

| Команда | Что делает |
|---|---|
| `/init-exocortex` | Развернуть и персонализировать репо (прямая инициация в Cowork) |
| `/init-me` | Заполнить профиль `About-Me/about-me.md` |
| `/review-concepts` | ★ Материал (документ/транскрипт) → авторское ревью → карточка концепта |
| `/list-concepts` | Обзор твоего репозитория концептов |
| `/teach-me` | Интерактивное обучение концепциям экзокортекса (тур / концепт / разбор затруднения) |
| `/new-project` | Создать проект (+ запись в карту проектов) |
| `/start-session` | Начать сессию по проекту |
| `/close-session` | Закрыть сессию: итог + следующий шаг |
| `/sync-agents` | Перегенерировать проекции агентов из канона `tools/skills/` |
| `/update-exocortex` | Обновить каркас из seed; миграция старой раскладки на 7 зон |
| `/link-concepts` | *(позже)* Связи и коллизии между концептами |

## Философия

Отчуждаемый экзокортекс: **когнитивный слой у тебя** (этот репо), LLM — внешний сменный движок. Ты не обучаешься «пользоваться инструментом» — ты **накапливаешь свои проверенные концепты** и растишь базу, которая переживёт смену модели, редактора и платформы.
