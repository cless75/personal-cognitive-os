---
name: start-session
description: >
  Начни рабочую сессию по проекту: сессия-атом в operation/sessions/, отметка
  в карточке проекта и в operation/daily/, статус в карте проектов → active.
  Диалог через выбор вариантов. Use when «начать сессию», «старт работы над проектом», /start-session.
kind: pipeline
---

# Навык: старт сессии по проекту

## Протокол (через AskUserQuestion)

1. **Выбери проект** (AskUserQuestion): подтяни список из карты проектов `CLAUDE.md` (или из `projects/*/`), предложи выбором.
2. **Цель сессии** (короткий текст): что хочешь сделать за эту сессию.
3. **Сессия-атом:** создай `operation/sessions/S{YYYYMMDD}T{HHMM}-{slug}.md` по шаблону из `operation/sessions/README.md` (frontmatter: SessionId, date, project, status: open).
4. **Отметки:**
   - В карточке проекта `projects/<slug>/<slug>.md`, внутри `<!-- sessions:start -->…<!-- sessions:end -->`, добавь:
     `### <ГГГГ-ММ-ДД HH:mm> — старт ([[../../operation/sessions/<SessionId>|сессия]])`  / `- Цель: <цель>`
   - В `operation/daily/<ГГГГ-ММ-ДД>.md` (создай из шаблона в `operation/daily/README.md`, если нет), в `## Сессии`:
     `### HH:mm — [[projects/<slug>/<slug>]] (старт)` / `- Цель: <цель>`
5. **Карта проектов** `CLAUDE.md`: обнови строку проекта — статус `active`, «Последняя сессия» = сегодня, «Следующий шаг» = цель. Правь только блок между маркерами.
6. Подтверди старт и держи цель сессии в фокусе.

## Выход
Открытая сессия: сессия-атом в `operation/sessions/`, отметки в карточке проекта, `operation/daily/`, карте проектов.
