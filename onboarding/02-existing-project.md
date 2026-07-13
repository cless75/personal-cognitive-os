# Дополнить существующий проект (созданный без seed)

Уже есть проект (в Claude Code или Cowork), созданный без Exocortex Base? Не нужно заводить отдельный репозиторий — добавь экзокортекс **на месте** (in-place), недеструктивно.

Механика — навык `/init-exocortex` → **режим B (in-place)**: добавляет недостающие зоны (`concepts/`, `About-Me/`, `sources/` с каналами, `operation/` (sessions+daily), `projects/`, `areas/`, `tools/skills/` (канон), `.exocortex/`, `onboarding/`), **дописывает** блок карты проектов в `CLAUDE.md` и подключает навыки — **ничего не перезаписывая**.

Загвоздка одна: в проекте без seed команды `/init-exocortex` ещё нет. Сначала сделай её доступной.

---

## Claude Code

Claude Code берёт навыки из `~/.claude/skills/` (личные, во всех проектах) и `.claude/skills/` (в проекте). Два варианта:

### Вариант 1 — установить `init-exocortex` глобально (один раз, для всех проектов)

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

Теперь открой свой проект в Claude Code и запусти:
```
/init-exocortex        → выбери режим B (in-place)
```
Навык сам подтянет seed, развернёт структуру, допишет карту в `CLAUDE.md` и скопирует остальные навыки в `.claude/skills` твоего проекта.

### Вариант 2 — скопировать навыки прямо в проект (без глобальной установки)

Из корня твоего проекта:

**Windows PowerShell:**
```powershell
git clone --depth 1 https://github.com/cless75/personal-cognitive-os "$env:TEMP\pco"
Copy-Item -Recurse -Force "$env:TEMP\pco\.claude" .
Remove-Item -Recurse -Force "$env:TEMP\pco"
```

**macOS / Linux / Git Bash:**
```bash
git clone --depth 1 https://github.com/cless75/personal-cognitive-os /tmp/pco
cp -r /tmp/pco/.claude ./ && rm -rf /tmp/pco
```
Команды доступны сразу (Claude Code подхватывает `.claude/skills` автоматически). Затем:
```
/init-exocortex        → режим B (in-place)
```

---

## Cowork

Cowork не читает `.claude/skills` из папки. Поставь навыки один раз (плагин/ZIP — см. [`distributions/README.md`](../distributions/README.md)), затем открой свой проект и запусти `/init-exocortex` → режим B.

---

## Гарантия недеструктивности

- Существующие файлы **не удаляются и не перезаписываются**.
- В `CLAUDE.md` правится только дописанный блок между маркерами `projects-map`.
- Одноимённые папки/навыки твоего проекта сохраняются как есть.
