# Установка Exocortex Base

**Exocortex Base** — твоя личная база концептов в обычных Markdown-файлах. Ты приносишь материал (документ или запись встречи), Claude помогает разобрать его на идеи и провести авторское ревью — а ты получаешь **свой проверенный репозиторий концептов**, не привязанный ни к одной платформе.

> После установки у тебя будет папка с командами Claude (`/review-concepts`, `/new-project` и др.) и растущей папкой `concepts/`.

**Репозиторий:** https://github.com/cless75/personal-cognitive-os

## Термины за 20 секунд

- **seed** — этот стартовый репозиторий (скачиваешь и растишь свой).
- **концепт** — одна продуманная идея = одна карточка в `concepts/`.
- **навык / команда** — действие Claude, вызывается через `/имя` (например `/review-concepts`).
- **поверхность** — где работаешь: Claude Code, Claude Cowork или Obsidian (для просмотра).

## Что нужно

- Установлен Claude — **Claude Code** (терминал/IDE) или **Claude Desktop с Cowork**.
- **git** (на Windows команды даю для PowerShell).
- (опционально) Obsidian — только чтобы смотреть файлы.

## Шаг 0. Выбери свою ситуацию

| Твоя ситуация | Куда идти |
|---|---|
| Хочу личный экзокортекс с нуля | **Сценарий A** |
| Уже есть проект, хочу встроить в него | **Сценарий B** |
| Просто посмотреть файлы | **Obsidian** |

---

## Сценарий A — начать с нуля

Получишь отдельный новый репозиторий-экзокортекс. Дальше — по шагам, ничего не пропускай.

### Шаг 1. Открой терминал и скачай папку

Терминал — это окно для команд.
- **Windows:** нажми `Пуск` → набери **PowerShell** → открой.
- **macOS:** открой приложение **Терминал** (Spotlight → «Терминал»).

В терминале перейди туда, куда хочешь скачать (например в Документы), и скачай:

```bash
cd ~/Documents
git clone https://github.com/cless75/personal-cognitive-os
```
> Windows PowerShell: вместо `cd ~/Documents` набери `cd $HOME\Documents`.

Появится папка `personal-cognitive-os`.

### Шаг 2. Открой эту папку в Claude

- **Claude Code** — в **том же терминале** зайди в папку и запусти Claude:
  ```bash
  cd personal-cognitive-os
  claude
  ```
  Откроется чат Claude Code прямо в этой папке. Навыки доступны сразу.

- **Claude Cowork** — в приложении Claude открой вкладку **Cowork** → открой папку `personal-cognitive-os` → **Settings → Plugins → Install plugin from folder** → выбери `.claude-plugin/`.
  *Почему: Cowork, в отличие от Claude Code, не подхватывает навыки из папки сам — их ставят плагином один раз.*

### Шаг 3. Где вводить команды

Команды вида `/имя` (например `/init-me`) пишешь **в поле чата Claude** (Code или Cowork) — **не в терминал**. Начни печатать `/` — появится список команд.

→ Дальше **[Первый цикл](#первый-цикл)**.

---

## Сценарий B — встроить в существующий проект

Уже есть проект, второй заводить не хочешь. Встроим экзокортекс прямо в него — **недеструктивно**: твои файлы не трогаются, добавляется только недостающее.

*Почему нужен доп. шаг: в проекте без экзокортекса команды `/init-exocortex` ещё нет — сначала «приносим» её.*

**Шаг 1. Принеси команду инициации** — выполни это **в терминале** (PowerShell / Терминал), один раз; команда станет доступна во всех проектах:

*Windows PowerShell:*
```powershell
git clone --depth 1 https://github.com/cless75/personal-cognitive-os "$env:TEMP\pco"
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse -Force "$env:TEMP\pco\.claude\skills\init-exocortex" "$HOME\.claude\skills"
Remove-Item -Recurse -Force "$env:TEMP\pco"
```

*macOS / Linux / Git Bash:*
```bash
git clone --depth 1 https://github.com/cless75/personal-cognitive-os /tmp/pco
mkdir -p ~/.claude/skills && cp -r /tmp/pco/.claude/skills/init-exocortex ~/.claude/skills/ && rm -rf /tmp/pco
```

**Шаг 2. Встрой** — открой свой проект в Claude и **в чате Claude** запусти:
```
/init-exocortex     → выбери «режим B (в этот проект)»
```
Команда сама скачает seed, добавит навыки и шаблоны, создаст недостающие папки и допишет карту проектов в `CLAUDE.md`. Существующие файлы не меняются.

*Cowork: то же самое, только навыки ставятся плагином/ZIP — см. [distributions/README.md](distributions/README.md).*

→ Дальше **[Первый цикл](#первый-цикл)**.

---

## Просмотр в Obsidian

Open folder as vault. Плагины не нужны — чистый Markdown. Смотри `concepts/` как граф, ходи по ссылкам. Правки и команды — через Claude Code / Cowork.

---

## Первый цикл

> Все команды ниже (`/init-me`, `/review-concepts`…) пишешь **в чат Claude** — в поле ввода Claude Code или Cowork, не в терминал.

**1. Расскажи о себе:**
```
/init-me
```
Заполнит `About-Me/about-me.md` — контекст, который Claude учитывает в работе.

**2. Создай первый концепт:** положи документ или запись встречи в `sources/`, затем:
```
/review-concepts
```
Claude извлечёт идеи, покажет черновик **твоими словами**, задаст 3–7 вопросов и проведёт через авторское ревью. → В `concepts/` появится карточка концепта.

**3. Веди проекты** (карта проектов сама пополняется в `CLAUDE.md`):
```
/new-project  →  /start-session  →  /close-session
```

### Проверь, что заработало

- Набери `/` — в списке видны команды (`review-concepts`, `new-project`…).
- После `/review-concepts` в `concepts/` появился новый `.md`-файл.
- В `CLAUDE.md` есть раздел «Карта проектов».

---

## Обновиться

`/update-exocortex` — подтянет свежие навыки и шаблоны, твои концепты и проекты не тронет. Если проект — форк seed: просто `git pull`.

## Если что-то не так

- **Cowork не видит команды** — это нормально: поставь плагин/ZIP (см. [distributions/README.md](distributions/README.md)).
- **PowerShell ругается на `&&`** — у тебя старый Windows PowerShell; бери PowerShell-блоки выше (в них `&&` нет).
- **CRLF-warnings** при git на Windows — безобидны.
- **`About-Me/`** — приватный профиль; можешь не коммитить в публичный форк.

---

**Все команды:** `/init-me` · `/review-concepts` · `/new-project` · `/start-session` · `/close-session` · `/list-concepts` · `/init-exocortex` · `/update-exocortex`

Подробнее — [START-HERE.md](START-HERE.md), [onboarding/](onboarding/).
