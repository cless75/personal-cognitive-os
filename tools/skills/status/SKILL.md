---
name: status
description: >
  Кросс-поверхностный статус экзокортекса, напечатанный в чат: вариант/уровень/режим,
  концепты (total·canon·AVP), sources, последний день, проекты; в Pro — режимы·подписки·governance.
  Аналог CLI-statusline для сред без хука (Cowork-GUI, Codex). Use when «статус»,
  «покажи состояние экзокортекса», «где я», /status.
kind: simple
---

# Навык: status — состояние экзокортекса в чат

Кросс-поверхностный индикатор (DM-EXO-10): печатает те же данные, что CLI-statusline, но **в чат** — работает в Cowork-GUI и Codex, где хук `.claude/hooks/statusline.cjs` не рисует бар.

## Протокол

1. **Запусти сканер в plain-режиме** из корня репозитория:
   ```
   EXO_PLAIN=1 node .claude/hooks/statusline.cjs
   ```
   (PowerShell: `$env:EXO_PLAIN=1; node .claude/hooks/statusline.cjs`.) Скрипт read-only, zero-dep, читает `.exocortex/manifest.yaml`, `concepts/`, `operation/`, `sources/`, `boks/`. `EXO_PLAIN=1` убирает ANSI-коды, чтобы вывод читался в чате.
2. **Если node недоступен** — собери те же цифры вручную (read-only): вариант/tier/режим из `.exocortex/manifest.yaml`; Concepts total/canon/AVP из `concepts/*.md` (`CANONICAL: true` / `status: pending-author-validation`); Sources — сумма файлов по каналам `sources/{inbox,mail,calendar,team-sessions,ai-sessions}/`; Last — последний по имени `operation/daily/YYYY-MM-DD*.md`; Projects — строки блока `projects-map` в `CLAUDE.md`; Pro — подписки из `boks/`, governance по `visibility` концептов.
3. **Покажи вывод** дословно (моноширинно). Ничего не пиши в файлы — навык read-only.

## Выход
Строки статуса экзокортекса в чате (Шапка · Концепты · [Pro: Подписки · Governance] · cwd).
