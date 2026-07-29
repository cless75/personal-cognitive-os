# distributions/ — установка навыков в Claude Cowork

**Claude Code** подхватывает навыки из `.claude/skills/` автоматически — тут ничего не нужно.

**Claude Cowork** НЕ читает `.claude/skills` из папки. Навыки ставятся одним из способов ниже. (Механизм — Research Preview; сверяйся с актуальной документацией Cowork.)

## Способ 1 — плагин из папки (рекомендуется)

Репозиторий содержит `.claude-plugin/plugin.json`. В Cowork: **Settings → Plugins → Install plugin from folder** → укажи корень репо. Навыки станут доступны в этом проекте.

## Способ 2 — ZIP-загрузка навыков репо

Собери ZIP из папок навыков и загрузи: **Settings → Capabilities → Skills → Upload**.

**Состав ZIP берётся из `.claude-plugin/plugin.json`, а не перечисляется руками** — иначе архив
отстаёт от реального набора навыков (так и случилось: `status`, `archive-item` в него не попадали).
Сначала `/sync-agents` (он перегенерирует `plugin.json`), потом сборка.

Сборка (PowerShell, из корня репо):

```powershell
$skills = (Get-Content .claude-plugin/plugin.json -Raw | ConvertFrom-Json).skills
Compress-Archive -Path $skills -DestinationPath .\distributions\personal-cognitive-os-skills.zip -Force
```

Сборка (bash, нужен `jq`):

```bash
zip -r distributions/personal-cognitive-os-skills.zip $(jq -r '.skills[]' .claude-plugin/plugin.json)
```

## Способ 3 — глобальная команда инициации `/init-exocortex`

Нужна ДО существования репо → ставится как навык **уровня пользователя** (доступен во всех проектах). Собери отдельный ZIP только из `init-exocortex` и загрузи через **Settings → Capabilities → Skills → Upload** (или скопируй папку в `~/.claude/skills/`):

```powershell
Compress-Archive -Path .\.claude\skills\init-exocortex `
  -DestinationPath .\distributions\init-exocortex.zip -Force
```

```bash
cd .claude/skills && zip -r ../../distributions/init-exocortex.zip init-exocortex && cd ../..
```

После установки `/init-exocortex` разворачивает новый персональный репозиторий из любого Cowork-проекта.

---

Примечание: точные пункты меню и формат плагина в Cowork могут отличаться по мере выхода из Research Preview — эти инструкции отражают модель на 2026-07.
