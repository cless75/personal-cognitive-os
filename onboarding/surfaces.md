# Поверхности: Obsidian или Cowork

Репозиторий — чистый Markdown. Работать можно в любом редакторе; навыки Claude доступны в двух средах. Ни одна не обязательна.

## Claude Code (проще всего для технических)

Claude Code **сам подхватывает** навыки из `.claude/skills/` открытой папки. Ничего устанавливать не нужно:

1. Открой папку репо в Claude Code (`claude` в каталоге репо или через IDE).
2. Команды `/review-concepts`, `/new-project` и т.д. доступны сразу.

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

## Obsidian (для просмотра)

Obsidian — только для чтения/навигации (граф, wikilinks). Плагины не требуются:

1. Open folder as vault → выбери репо.
2. Смотри `concepts/` как граф, ходи по `[[ссылкам]]`.

Правки и навыки — через Claude Code / Cowork; Obsidian показывает результат.

---

Совместимость Cowork-механизма проверяй по актуальной документации Claude Cowork — детали установки плагинов/навыков могут меняться (Research Preview).
