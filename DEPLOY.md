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

### Уже есть проект (создан без seed)?

Не заводи новый репозиторий — добавь экзокортекс на месте (in-place), недеструктивно.

**Claude Code:** сделай команду доступной и запусти её в своём проекте:
```bash
git clone --depth 1 https://github.com/cless75/personal-cognitive-os /tmp/pco
cp -r /tmp/pco/.claude ./ && rm -rf /tmp/pco   # добавит навыки и команды в проект
```
```
/init-exocortex        → режим B (in-place)     # достроит папки + карту проектов в CLAUDE.md
```
(или поставь `init-exocortex` глобально в `~/.claude/skills/` — будет во всех проектах.)

**Cowork:** поставь навыки (плагин/ZIP, см. [`distributions/README.md`](distributions/README.md)) → `/init-exocortex` → режим B.

Подробно — [onboarding/02-existing-project.md](onboarding/02-existing-project.md).

### Обновить установленный экзокортекс

`/update-exocortex` — подтягивает свежие навыки/шаблоны/доки, не трогая твои концепты, профиль и проекты. Если проект — форк seed: просто `git pull`.

### Команды

`/review-concepts` · `/init-me` · `/new-project` · `/start-session` · `/close-session` · `/list-concepts` · `/init-exocortex` · `/update-exocortex`

Подробности — [START-HERE.md](START-HERE.md) и [onboarding/](onboarding/).
