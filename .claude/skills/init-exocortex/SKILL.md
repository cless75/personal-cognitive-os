---
x_generated: "sync-agents — правь канон в tools/skills/"
name: init-exocortex
description: Инициализирует новый personal или team экзокортекс в отдельном каталоге, встраивает экзокортекс в существующий проект либо передаёт миграцию в update-exocortex. Использовать для «инициализируй экзокортекс», «создай семейный/team vault», «разверни репозиторий», «добавь экзокортекс в проект» и /init-exocortex.
---

# Инициализация экзокортекса

Вести поток недеструктивно. Сохранять прогресс в `.exocortex/manifest.yaml`; повторный запуск не должен перезаписывать пользовательские данные.

## 1. Определить топологию и тип

Сначала выбрать топологию:

- `A` — новый независимый vault;
- `B` — in-place в существующий проект, только добавление отсутствующего;
- `C` — миграция старой раскладки через `update-exocortex`.

Затем выбрать тип: `personal` или `team`.

Если CWD содержит `.exo-workspace.yaml`, но не содержит собственного `.exocortex/manifest.yaml`, считать его workspace-root. Никогда не создавать зоны vault в таком корне. Для топологии A требовать дочерний каталог; после создания запустить `exo workspace scan` или эквивалентно обновить реестр недеструктивно.

## 2. Собрать параметры

Для `personal` запросить имя vault, владельца, приватность, агентов и remote.

Для `team` запросить:

- имя vault и участников с устойчивыми идентификаторами;
- режим владения и правило структурных изменений;
- приватность, inbound sharing и default visibility;
- агентов и remote.

Задавать по одному вопросу. Не запрашивать личные профили, почту или секреты для Team-vault.

## 3. Развернуть

Для топологии A использовать `scripts/scaffold_exocortex.py`. Передать точный commit SHA seed через `--seed-sha`; не использовать плавающий ref. Скрипт создаёт новую историю и фиксированный минимальный снимок без `.git`, `_overlay`, build-инфраструктуры и seed-history.

Пример Team-init:

```powershell
python scripts/scaffold_exocortex.py --workspace-root D:\work --target D:\work\family-cognitive-os --type team --name family-cognitive-os --member team/dmitry --member team/angelina --agent claude-code --agent codex --seed-sha <40-char-sha>
```

Для topology B копировать только отсутствующие seed-managed файлы и зоны. Не заменять существующие `AGENTS.md`, профили, проекты, источники или настройки. Для C запустить `update-exocortex`.

## 4. Инициализировать субъект

Для `personal` запустить `init-me` и сохранить профиль в `About-Me/`.

Для `team` не запускать `init-me`. Создать общий профиль субъекта, реестр участников, governance, шаблон work unit с ровно одним `A`, стартовый проект и handoff. Личные материалы допускаются только после явной публикации; внутри Team-vault всё имеет общую видимость.

## 5. Создать проекции и проверить

Запустить `sync-agents`:

- Claude Code: `.claude/skills` и команды;
- Codex: `.agents/skills`; `.codex/config.toml` только для project config/MCP;
- `AGENTS.md` — тонкий вход.

User-level копию этого навыка устанавливать `scripts/install_user_skill.ps1`; канон остаётся в seed, повторная установка заменяет только управляемую копию `$HOME/.agents/skills/init-exocortex`.

После scaffold:

1. зарегистрировать vault в workspace;
2. запустить `scripts/smoke_test.py <vault>`;
3. повторить scaffold с теми же параметрами и убедиться, что данные и git diff не изменились;
4. выполнить privacy scan;
5. предложить сделать vault активным, не переключать без подтверждения.

## Инварианты

- Не создавать vault в workspace-root.
- Не наследовать историю seed.
- Не перезаписывать существующие файлы и семейные данные.
- Не переносить personal profile, credentials, абсолютные локальные пути и секреты.
- В Team work unit должен быть ровно один `A`; структурные изменения требуют review второго владельца.

