# Аудит seed-линии после family Team-init — 2026-08-10

## Выполнено

- Team-init отделён от personal-init и запрещён в workspace-root.
- Зафиксирован точный seed SHA в manifest семейного vault; новый vault не наследует seed-history, `_overlay` и build-инфраструктуру.
- Codex scope исправлен на repo-level `.agents/skills` и user-level `$HOME/.agents/skills`; `.codex/config.toml` оставлен для project config/MCP.
- `family-cognitive-os` создан, зарегистрирован и опубликован отдельным приватным репозиторием.

## Оставшиеся дефекты и долги

1. **Base dirty.** В `personal-cognitive-os` остаются незакоммиченные изменения, включая ранее созданный `distributions/workspace/` и текущую Team-init ветку. Нужен отдельный review и отдельный коммит, не связанный с семейными данными.
2. **Pro dirty / overlay drift.** `extract-overlay.mjs --check` против `upstream/master@2aa48f9` нашёл 40 Pro-only файлов, 29 расходящихся общих, две правки мимо overlay (`link-concepts`, `publish-concept`) и четыре лишних session-файла в overlay, уже совпавших с Base. До reconciliation Pro нельзя считать воспроизводимым.
3. **Active projection incomplete.** В `cless75-ex1` обновлён контракт `sync-agents`, но полная repo-проекция `.agents/skills` ещё не сгенерирована из-за большого dirty worktree; делать отдельной сессией после разбора расхождений.
4. **`DEPLOY.md` legacy.** Документ требует ревизии относительно workspace topology, Team-init и официального Codex scope.
5. **Tier naming drift.** В модели используется `Entrepreneur`, а часть manifest/comments всё ещё перечисляет `master`; нужен отдельный schema decision и миграция.
6. **Нет самостоятельного обезличенного Team-seed.** Сейчас используется детерминированный минимальный snapshot в `init-exocortex`; выделение отдельного seed-репозитория намеренно отложено до апробации family vault.
7. **GitHub governance gate не автоматизирован.** Branch protection приватного репозитория вернул 403 на текущем тарифе. До смены тарифа действуют `CODEOWNERS`, PR-template и ручное правило review второго владельца.

## Не смешивать

Не переносить в Team-seed или семейный vault содержимое `About-Me`, credentials, абсолютные локальные пути, secrets и данные активного `cless75-ex1`.
