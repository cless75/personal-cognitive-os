# distributions/ — установка навыков в Claude Cowork

**Claude Code** подхватывает навыки из `.claude/skills/` автоматически — тут ничего не нужно.

**Claude Cowork** НЕ читает `.claude/skills` из папки. Навыки ставятся одним из способов ниже. (Механизм — Research Preview; сверяйся с актуальной документацией Cowork.)

## Способ 1 — плагин из папки (рекомендуется)

Репозиторий содержит `.claude-plugin/plugin.json`. В Cowork: **Settings → Plugins → Install plugin from folder** → укажи корень репо. Навыки станут доступны в этом проекте.

## Способ 2 — ZIP-загрузка навыков репо

Собери ZIP из папок навыков и загрузи: **Settings → Capabilities → Skills → Upload**.

Сборка (PowerShell, из корня репо):

```powershell
Compress-Archive -Path .\.claude\skills\review-concepts, `
  .\.claude\skills\init-me, .\.claude\skills\new-project, `
  .\.claude\skills\start-session, .\.claude\skills\close-session, `
  .\.claude\skills\list-concepts, .\.claude\skills\teach-me `
  -DestinationPath .\distributions\personal-cognitive-os-skills.zip -Force
```

Сборка (bash):

```bash
cd .claude/skills && zip -r ../../distributions/personal-cognitive-os-skills.zip \
  review-concepts init-me new-project start-session close-session list-concepts teach-me && cd ../..
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
