# Установка Exocortex Base

Гид для нового пользователя. Найди свою ситуацию ниже — каждый сценарий самодостаточен.

**Репозиторий:** https://github.com/cless75/personal-cognitive-os

## Что нужно

- Установлен Claude — **Claude Code** (терминал/IDE) или **Claude Desktop с Cowork**.
- `git`.
- (опционально) Obsidian — только для просмотра.

## Какой ты пользователь?

| Твоя ситуация | Сценарий |
|---|---|
| Хочу личный экзокортекс с нуля | **A** |
| У меня уже есть проект (без seed), хочу добавить в него | **B** |
| Просто посмотреть | **Obsidian** |

---

## Сценарий A — Начать с нуля (свой новый репозиторий)

### A1. Claude Code (проще всего)

```bash
git clone https://github.com/cless75/personal-cognitive-os
```
Открой папку в Claude Code — команды доступны сразу (навыки лежат в `.claude/skills`). Переходи к **[Первому циклу](#первый-рабочий-цикл)**.

### A2. Claude Cowork

```bash
git clone https://github.com/cless75/personal-cognitive-os
```
Открой папку в Cowork → **Settings → Plugins → Install plugin from folder** → выбери `.claude-plugin/`.
(Cowork не читает `.claude/skills` из папки сам — поэтому ставим плагин.) Готово → **[Первый цикл](#первый-рабочий-цикл)**.

---

## Сценарий B — Добавить в существующий проект (созданный без seed)

Заводить второй репозиторий не нужно — внедряем на месте, **недеструктивно** (твои файлы не трогаются).

### B1. Claude Code

Сделай команду инициации доступной (один раз, во всех проектах):

**Windows PowerShell:**
```powershell
git clone --depth 1 https://github.com/cless75/personal-cognitive-os "$env:TEMP\pco"
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse -Force "$env:TEMP\pco\.claude\skills\init-exocortex" "$HOME\.claude\skills"
Remove-Item -Recurse -Force "$env:TEMP\pco"
```

**macOS / Linux / Git Bash:**
```bash
git clone --depth 1 https://github.com/cless75/personal-cognitive-os /tmp/pco
mkdir -p ~/.claude/skills && cp -r /tmp/pco/.claude/skills/init-exocortex ~/.claude/skills/ && rm -rf /tmp/pco
```

Открой свой проект и запусти:
```
/init-exocortex     → выбери режим B (внедрить в этот проект)
```
Команда сама подтянет seed и встроит навыки/шаблоны, создаст недостающие папки, допишет карту проектов в `CLAUDE.md` — не трогая существующие файлы.

### B2. Cowork

Поставь навыки (плагин/ZIP — см. [`distributions/README.md`](distributions/README.md)), открой проект → `/init-exocortex` → режим B.

Подробно — [onboarding/02-existing-project.md](onboarding/02-existing-project.md).

---

## Просмотр в Obsidian

Open folder as vault. Плагины не нужны — чистый Markdown. Смотри `concepts/` как граф, ходи по ссылкам. Правки и навыки — через Claude Code / Cowork.

---

## Первый рабочий цикл

Одинаково во всех сценариях:
```
/init-me                # заполни профиль About-Me
```
Положи документ или транскрипт в `sources/`, затем:
```
/review-concepts        # авторское ревью → карточка концепта в concepts/
```
Веди проекты (карта проектов сама пополняется в `CLAUDE.md`):
```
/new-project  →  /start-session  →  /close-session
```

## Обновиться

`/update-exocortex` — свежие навыки/шаблоны/доки; твои концепты, профиль и проекты нетронуты. Если твой проект — форк seed: просто `git pull`.

## Если что-то не так

- **Cowork не видит команды** → это норма (Cowork не читает `.claude/skills` из папки). Поставь плагин или ZIP — см. [`distributions/README.md`](distributions/README.md).
- **CRLF-warnings** при git на Windows — безобидны.
- **`About-Me/`** — приватный профиль; можно не коммитить в публичный форк (см. `.gitignore`).

---

**Команды:** `/init-me` · `/review-concepts` · `/new-project` · `/start-session` · `/close-session` · `/list-concepts` · `/init-exocortex` · `/update-exocortex`

Подробнее — [START-HERE.md](START-HERE.md) и [onboarding/](onboarding/).
