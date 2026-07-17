---
name: start-session
description: >
  Начни рабочую сессию по проекту: атом = Session Note в operation/sessions/,
  отметка в карточке проекта и в operation/daily/, статус в карте проектов →
  active. Диалог через выбор вариантов. Use when «начать сессию», «старт работы над проектом», /start-session.
kind: pipeline
---

# Навык: старт сессии по проекту

## Протокол (через AskUserQuestion)

1. **Выбери проект** (AskUserQuestion): подтяни список из карты проектов `CLAUDE.md` (или из `projects/*/`), предложи выбором.
2. **Цель сессии** (короткий текст): что хочешь сделать за эту сессию.
3. **Атом = Session Note** (канон 2026-07-17): создай `operation/sessions/S{ГГГГММДД}T{ЧЧММ}-{slug}.md` из шаблона в `operation/sessions/README.md` — frontmatter: атом (`session_id / when / where / project / mode: ispolnenie / source / produced: []`) + жизненный цикл (`Status: "🔵 Активна"`, `Active: true`). Тело — skeleton секций; в «Цель» — цель сессии. *(Слой опционален: для микро-действия можно пропустить.)*
4. **Отметки:**
   - В карточке проекта `projects/<slug>/<slug>.md`, внутри `<!-- sessions:start -->…<!-- sessions:end -->`, добавь:
     `### <ГГГГ-ММ-ДД HH:mm> — старт`  / `- Цель: <цель>` / `- Сессия: [[sessions/S…]]`
   - В `operation/daily/<ГГГГ-ММ-ДД>.md` (создай из шаблона в `operation/daily/README.md`, если нет), в `## Сессии`:
     `### HH:mm — [[projects/<slug>/<slug>]] (старт)` / `- Цель: <цель>`
5. **Карта проектов** `CLAUDE.md`: обнови строку проекта — статус `active`, «Последняя сессия» = сегодня, «Следующий шаг» = цель. Правь только блок между маркерами.
6. Подтверди старт и держи цель сессии в фокусе.

## Выход
Открытая сессия: атом = Session Note в `operation/sessions/` (skeleton), отметки в карточке проекта, `operation/daily/`, карте проектов.
