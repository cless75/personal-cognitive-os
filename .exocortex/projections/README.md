# .exocortex/projections/ — правила генерации проекций

Как канон (`tools/skills/`) превращается в то, что видит конкретный агент. Использует навык `/sync-agents`.

| Агент | Проекция | Механика |
|-------|----------|----------|
| `claude-code` | `.claude/skills/` (копии SKILL.md + ресурсов), `.claude/commands/*.md`, hooks | копирование канона + маркер `x_generated` во frontmatter |
| `cowork` | `.claude-plugin/plugin.json` (реестр путей на `.claude/skills/*`) + ZIP в `distributions/` | генерация JSON по списку скиллов; пересборка ZIP |
| `codex` | `.codex/skills/` (копии SKILL.md, формат Codex-Skills == канон) + `.codex/config.toml` (`[mcp_servers.*]` из `tools/mcp/`) + `AGENTS.md` (тонкий вход) | копирование канона (project-scoped) + TOML-эмиттер MCP + entry — см. `codex/README.md` |
| `cursor` / другой | `AGENTS.md` — тонкий вход с картой зон и списком навыков | генерация из шаблона entry |
| (все) | `CLAUDE.md` — тонкий вход Claude | генерация из шаблона entry; блок `projects-map` сохраняется как user-owned |

Правила:
- Проекции **не редактируются руками** — любая правка навыка делается в `tools/skills/` и перегенерируется.
- Скилл с `tier:` выше текущего в манифесте в проекцию не попадает.
- Шаблоны entry-файлов лежат рядом (`entry-CLAUDE.md`, `entry-AGENTS.md`) — при их отсутствии `sync-agents` использует встроенную структуру из своего SKILL.md.
- `codex` — project-scoped (`.codex/` в корне репо, не только `~/.codex/`) ради переносимости инстанса (DM-EXO-10). Детали — `codex/README.md`.
