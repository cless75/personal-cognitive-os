# Развёртывание Exocortex Base

Быстрый старт. Нужен установленный Claude и `git`.

## 1. Скачай

```bash
git clone https://github.com/cless75/personal-cognitive-os
```

## 2. Подключи навыки

**Claude Code** — ничего не нужно: открой папку, навыки из `.claude/skills` доступны сразу.

**Claude Cowork** — Cowork не читает `.claude/skills` из папки. Открой папку и поставь плагин один раз:
> Settings → Plugins → Install plugin from folder → выбери `.claude-plugin/`

## 3. Начни

```
/init-me                     # заполни профиль About-Me
```
Положи документ или транскрипт в `sources/` и запусти:
```
/review-concepts             # авторское ревью → карточка концепта в concepts/
```

Готово. Дальше веди проекты: `/new-project` → `/start-session` → `/close-session` (карта проектов сама пополняется в `CLAUDE.md`).

---

### Уже есть проект в Cowork?

Не заводи новый репозиторий — добавь экзокортекс на месте:
1. Поставь навыки (плагин/ZIP, см. [`distributions/README.md`](distributions/README.md)).
2. Запусти `/init-exocortex` → **режим B (in-place)** — добавит недостающее, ничего не перезапишет.

### Команды

`/review-concepts` · `/init-me` · `/new-project` · `/start-session` · `/close-session` · `/list-concepts` · `/init-exocortex`

Подробности — [START-HERE.md](START-HERE.md) и [onboarding/](onboarding/).
