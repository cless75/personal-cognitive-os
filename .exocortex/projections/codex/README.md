# projections/codex/ — контракт codex-native проекции (DM-EXO-10)

Как канон (`tools/skills/`, `tools/mcp/`) проецируется под **OpenAI Codex CLL**. Генерирует `/sync-agents` для агента `codex` из `agents:` манифеста. Руками не редактируется.

## Нативные конвенции Codex CLI (июль 2026)

- **AGENTS.md** — Codex читает нативно перед работой (project-scoped). Тонкий вход: карта зон + указатель на навыки/MCP/канон.
- **Skills** — формат `SKILL.md` (frontmatter `name` + `description`, progressive disclosure), каталог `.agents/skills/` (repo scope) или `$HOME/.agents/skills/` (user scope), auto-detected. **Тот же формат, что канон `tools/skills/`** — проекция почти дословная.
- **MCP** — секция `[mcp_servers.<name>]` в `.codex/config.toml` (TOML), project-scoped. Для stdio-сервера: `command` + `args` (+ env); для HTTP: `url`.

## Что генерирует sync-agents

| Цель | Источник | Правило |
|------|----------|---------|
| `.agents/skills/<name>/` | `tools/skills/<name>/` (SKILL.md + ресурсы) | remove+copy; `x_generated`; `init-exocortex` (user-level) исключён; гейт по `tier:` |
| `.codex/config.toml` → `[mcp_servers.*]` | `tools/mcp/*` | TOML-эмиттер; конвертация из JSON `mcpServers`; пустой канон → секция отсутствует |
| `AGENTS.md` | `entry-AGENTS.md` (или встроенная структура) | тонкий вход; «навыки из `.agents/skills/` или `$<skill>`; MCP — `.codex/config.toml`; канон — `tools/skills/`» |

## Инварианты

- **Repo-scoped** (`.agents/skills/` в корне репо) — переносимая проекция. User-level `$HOME/.agents/skills/` — не цель repo-проекции.
- **seed-managed** — `.agents/skills/*` и управляемые секции `.codex/config.toml` перезаписываются `sync-agents`, учтены в `update-exocortex`.
- **Идемпотентность** — повторный прогон без изменений канона не создаёт diff (кроме `x_generated`).
- **Tier-гейт** — Base: 10 навыков + фикс. режим Исполнение; Pro: 16 навыков + 4 режима + подписки в `[mcp_servers]`.
