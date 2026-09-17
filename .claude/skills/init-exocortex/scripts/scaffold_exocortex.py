#!/usr/bin/env python3
"""Deterministic, non-destructive Personal/Team exocortex scaffold."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path


SHA_RE = re.compile(r"^[0-9a-f]{40}$")
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")


def put(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(content.rstrip() + "\n", encoding="utf-8")


def manifest(args: argparse.Namespace) -> str:
    agents = "\n".join(f"  - {agent}" for agent in args.agent)
    tier = "team" if args.type == "team" else "base"
    common = f"""type: {args.type}
tier: {tier}
name: {args.name}
seeded_from: personal-cognitive-os@{args.seed_sha}
created: {args.created}
schema_version: 3
init_state: complete
agents:
{agents}"""
    if args.type == "personal":
        return common + f"\nowner: {args.owner}\nprivacy: private\n"
    members = "\n".join(f"  - id: {member}" for member in args.member)
    return common + f"""
members:
{members}
governance:
  mode: joint
  structural_change: second-owner-review
  work_unit_accountable: exactly-one
sharing:
  inbound: explicit-only
  default_visibility: shared
  personal_data: forbidden
privacy: private
"""


ZONE_RULE = "Материалы появляются здесь только после явного отбора. Неотобранные личные материалы, секреты и credentials запрещены."


def scaffold(args: argparse.Namespace) -> None:
    workspace = args.workspace_root.resolve()
    target = args.target.resolve()
    if target == workspace:
        raise SystemExit("Refusing to scaffold in workspace-root")
    try:
        target.relative_to(workspace)
    except ValueError as exc:
        raise SystemExit("Target must be a child of workspace-root") from exc
    if not SHA_RE.fullmatch(args.seed_sha):
        raise SystemExit("--seed-sha must be a lowercase 40-character commit SHA")
    if not SLUG_RE.fullmatch(args.name):
        raise SystemExit("--name must be a lowercase slug")
    if args.type == "team" and len(args.member) < 2:
        raise SystemExit("Team vault requires at least two --member values")
    if args.type == "personal" and not args.owner:
        raise SystemExit("Personal vault requires --owner")

    target.mkdir(parents=True, exist_ok=True)
    put(target / ".exocortex/manifest.yaml", manifest(args))
    put(target / ".gitignore", ".DS_Store\n.env\n*.key\n*.pem\ncredentials*\nsecrets*\n")

    zones = ["concepts", "projects", "areas", "sources", "sources/inbox", "sessions", "decisions", "handoff"]
    for zone in zones:
        put(target / zone / "README.md", f"# {zone}\n\n{ZONE_RULE}")

    if args.type == "personal":
        put(target / "About-Me/about-me.md", "# Профиль владельца\n\nЗаполнить через `init-me`. Не публиковать без явного решения владельца.")
        title = "Personal Cognitive OS"
    else:
        put(target / "team/profile.md", "# Семейный субъект\n\nСовместная среда для решений, проектов и знаний семьи. Личные профили здесь не хранятся.")
        rows = "\n".join(f"| `{m}` | owner | write |" for m in args.member)
        put(target / "team/members.md", f"# Участники\n\n| ID | Роль | Доступ |\n|---|---|---|\n{rows}")
        put(target / "team/governance.md", "# Governance\n\n- Владение совместное.\n- Структурные изменения требуют review второго владельца.\n- В каждой единице работы ровно один Accountable (`A`).\n- Личное публикуется только явным переносом из персонального vault.\n- Всё опубликованное в этом vault доступно обоим участникам.")
        put(target / "templates/work-unit.md", "# Work unit: <результат>\n\n## RACI\n\n| Участник | R/A/C/I |\n|---|---|\n| <один участник> | A |\n| <второй участник> | R/C/I |\n\n> Проверка: в таблице должна быть ровно одна `A`.")
        put(target / "projects/family-cognitive-os/README.md", "# Family Cognitive OS — стартовый проект\n\n## Цель\n\nПровести первый совместный цикл: выбрать одну семейную единицу работы, назначить ровно одного `A`, выполнить и сделать review.\n\n## Backlog\n\n- [ ] Подключить второго владельца по `handoff/ANGELINA.md`.\n- [ ] Выбрать первую совместную единицу работы.\n- [ ] Проверить правило явной публикации.")
        put(target / "handoff/ANGELINA.md", "# Подключение второго владельца\n\n1. Клонировать приватный репозиторий.\n2. Запустить Claude Code или Codex из корня vault.\n3. Проверить `AGENTS.md` и доступные repo skills.\n4. Личное держать в персональном vault; сюда переносить только явной публикацией.\n5. Создать work unit из `templates/work-unit.md`, оставить ровно одного `A`, выполнить и запросить review.")
        title = "Family Cognitive OS"

    put(target / "README.md", f"# {title}\n\nОтдельный экзокортекс `{args.name}`. Конфигурация находится в `.exocortex/` и `tools/`; данные — только в совместных зонах.")
    put(target / "AGENTS.md", "# AGENTS.md\n\nЧитайте `.exocortex/manifest.yaml` и правила в `team/governance.md` (для Team). Канон навыков — `tools/skills`; Codex-проекция — `.agents/skills`; `.codex/config.toml` содержит только project config/MCP.")
    put(target / "CLAUDE.md", "# Claude Code\n\nЧитайте `AGENTS.md`. Проекция навыков Claude Code находится в `.claude/skills`; канон — `tools/skills`.")
    put(target / ".github/CODEOWNERS", "/.exocortex/ @cless75 @AngelinaMe\n/tools/ @cless75 @AngelinaMe\n/AGENTS.md @cless75 @AngelinaMe\n/README.md @cless75 @AngelinaMe\n/*/README.md @cless75 @AngelinaMe\n")
    put(target / ".github/pull_request_template.md", "## Проверки\n\n- [ ] Нет личных данных или секретов.\n- [ ] В work unit ровно один `A`.\n- [ ] Структурное изменение reviewed вторым владельцем либо это не структурное изменение.")
    team_skill = "---\nname: team-work-unit\ndescription: Создаёт и проверяет семейную единицу работы с RACI; использовать для нового совместного дела, назначения ролей и проверки ровно одного Accountable.\nmetadata:\n  tier: team\n---\n\n# Team work unit\n\nСкопировать `templates/work-unit.md`, описать результат, назначить ровно одного `A`, затем запросить review второго владельца для структурных изменений."
    put(target / "tools/README.md", "# Tools\n\nСемейно-нейтральная конфигурация и канон навыков. Семейные данные здесь запрещены.")
    put(target / "tools/skills/team-work-unit/SKILL.md", team_skill)
    put(target / ".agents/skills/team-work-unit/SKILL.md", team_skill)
    put(target / ".claude/skills/team-work-unit/SKILL.md", team_skill)
    put(target / ".codex/config.toml", "# Project configuration and MCP only. Skills live in .agents/skills.\n")

    if not (target / ".git").exists():
        subprocess.run(["git", "init", "-b", "main"], cwd=target, check=True, capture_output=True)


def parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser()
    p.add_argument("--workspace-root", type=Path, required=True)
    p.add_argument("--target", type=Path, required=True)
    p.add_argument("--type", choices=("personal", "team"), required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--owner", default="")
    p.add_argument("--member", action="append", default=[])
    p.add_argument("--agent", action="append", default=[])
    p.add_argument("--seed-sha", required=True)
    p.add_argument("--created", default="2026-08-10")
    return p


if __name__ == "__main__":
    scaffold(parser().parse_args())
