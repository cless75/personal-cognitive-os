#!/usr/bin/env python3
from pathlib import Path
import re
import sys

root = Path(sys.argv[1]).resolve()
manifest = (root / ".exocortex/manifest.yaml").read_text(encoding="utf-8")
required = ["type: team", "tier: team", "governance:", "sharing:", "seeded_from: personal-cognitive-os@"]
missing = [item for item in required if item not in manifest]
paths = ["team/profile.md", "team/members.md", "team/governance.md", "templates/work-unit.md", ".agents/skills/team-work-unit/SKILL.md", ".codex/config.toml", ".github/CODEOWNERS"]
missing += [path for path in paths if not (root / path).exists()]
work = (root / "templates/work-unit.md").read_text(encoding="utf-8")
if len(re.findall(r"\|\s*A\s*\|", work)) != 1:
    missing.append("work-unit must contain exactly one A")
if missing:
    raise SystemExit("SMOKE FAIL: " + ", ".join(missing))
print("SMOKE OK")
