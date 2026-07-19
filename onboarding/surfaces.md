# Поверхности: Claude Code · Cowork · Codex · Obsidian

Репозиторий — чистый Markdown. Работать можно из любого агента списка `agents:` в `.exocortex/manifest.yaml`; проекции под них генерирует `/sync-agents`. Ни одна поверхность не обязательна.

**Индикатор состояния в любой среде:** команда `/status` (навык `status`) печатает состояние экзокортекса прямо в чат — работает в Cowork-GUI и Codex, где нет CLI-строки статуса Claude Code.

## Claude Code (проще всего для технических)

Claude Code **сам подхватывает** навыки из `.claude/skills/` открытой папки. Ничего устанавливать не нужно:

1. Открой папку репо в Claude Code (`claude` в каталоге репо или через IDE).
2. Команды `/review-concepts`, `/new-project`, `/status` и т.д. доступны сразу.

## Codex (OpenAI Codex CLI)

Codex **нативно грузит** навыки экзокортекса из `.codex/skills/` (формат `SKILL.md`, project-scoped) и читает `AGENTS.md` перед работой. Устанавливать ничего не нужно:

1. Запусти `codex` в каталоге репо.
2. `/skills` покажет навыки экзокортекса; вызов — `$review-concepts` (или по описанию автоматически).
3. MCP-серверы (если заведены в каноне `tools/mcp/`) подхватываются из `.codex/config.toml`.

`.codex/` — генерируемая проекция (`/sync-agents`), как `.claude/`; руками не редактируется.

## Cowork

⚠️ Важно: **Claude Cowork НЕ читает `.claude/skills` из папки автоматически** (в отличие от Claude Code). Навыки нужно установить одним из способов:

**Способ 1 — плагин из папки (рекомендуется):**
1. Открой папку репо в Cowork: Open folder → выбери склонированный `personal-cognitive-os`.
2. Settings → Plugins → Install plugin from folder → укажи `.claude-plugin/` в репо.
3. Команды становятся доступны в этом проекте.

**Способ 2 — ZIP-загрузка:**
1. Settings → Capabilities → Skills → Upload.
2. Выбери `distributions/personal-cognitive-os-skills.zip` (собери его по инструкции в [`distributions/README.md`](../distributions/README.md)).

**Глобальная команда инициации `/init-exocortex`:**
Она нужна ДО того, как репо существует, поэтому ставится как навык **уровня пользователя**:
1. Settings → Capabilities → Skills → Upload → `distributions/init-exocortex.zip`.
2. После этого `/init-exocortex` доступен в любом Cowork-проекте и разворачивает новый репозиторий.

**Обновление навыков в Cowork (когда канон изменился):**
1. `git pull` в папке репо (подтянуть новый канон и перегенерированные проекции).
2. Переустанови плагин из папки (Способ 1) **или** реимпортируй свежий `distributions/personal-cognitive-os-skills.zip`. Реестр навыков Cowork берётся только из `plugin.json` — новый навык появляется после переустановки.

## Obsidian (для просмотра)

Obsidian — только для чтения/навигации (граф, wikilinks). Плагины не требуются:

1. Open folder as vault → выбери репо.
2. Смотри `concepts/` как граф, ходи по `[[ссылкам]]`.

Правки и навыки — через Claude Code / Cowork; Obsidian показывает результат.

---

Совместимость Cowork-механизма проверяй по актуальной документации Claude Cowork — детали установки плагинов/навыков могут меняться (Research Preview).
