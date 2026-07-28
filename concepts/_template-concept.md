---
ConceptType: principle        # model | framework | principle | method | antipattern
Авторство: авторская          # авторская | заимствованная | адаптированная
domain: general               # strategy | product | thinking | meta | general | ...
version: v1-draft
CANONICAL: false              # true после авторского ревью
status: pending-author-validation   # → canon-v1 после ревью
knowledge_status: exploring       # exploring | working | shipped — ось «исследуемое → рабочее → поставляемое» (545-a1 §4)
mapping_530_status: pending       # pending until DM-EXO-12 acceptance; не означает 530 Core-Concepts
# 530 future-contract fields (do not fill mechanically): node_type, abstraction_level,
# cynefin_status, canonical_scope, subject_bindings, author_id, expert_bok
CDate: "{{date}}"
AVP_date:                     # дата авторского ревью (проставляется при финализации)
Источник:                     # откуда извлечён (файл/сессия), человекочитаемо
source_session:               # session_id атома-источника, если сессии ведутся; иначе пусто
---

# {Название концепта}

## Определение (одна строка)

> [ТРЕБУЕТ РЕВЬЮ — слова автора] {Одна ёмкая формулировка для глоссария/слайда.}

---

## Какую задачу решает (Pattern)

- **Повторяемая ситуация:** {когда это возникает}
- **Что решает концепция:** {суть}
- **Для кого:** {адресат}
- **Границы:** {где НЕ применять}

---

## Логика модели

### Ядро (инварианты)

- [ТРЕБУЕТ РЕВЬЮ] {Несжимаемое утверждение — то, без чего концепт разваливается.}
  - Якорь (цитата автора): *«{прямая цитата из источника}»*

### Ключевые взаимосвязи

- `{A}` → `{B}` — {как связаны}

### Границы применимости

- Работает, пока {условие}. Антипаттерн: {где ломается}.

### Маркеры коллизий

- Смежно с [[{другой-концепт}]]: {в чём различие; фиксировать как cross-ref или слияние}.

---

## Связи с другими концептами

- [[{концепт}]] — {как связаны}

---

## 530 mapping (pending)

> `concepts/` — локальный каталог 707, не 530 `Core-Concepts`. Заполняется только после отдельного
> решения DM-EXO-12 или при явной типизации карточки.

- `node_type`: pending
- `abstraction_level`: pending
- `cynefin_status`: pending
- `canonical_scope`: pending
- `subject_bindings`: pending

---

## Эволюция

| Дата | Версия | Событие | Изменение |
|------|--------|---------|-----------|
| {{date}} | v1-draft | Извлечено из {источник} | Draft, ожидает авторского ревью |

---

## Журнал авторского ревью

> Заполняется навыком `review-concepts` при финализации. Каждая строка — явный вердикт автора.

- [ ] Ядро/инварианты — {вердикт}
- [ ] Границы — {вердикт}
- [ ] Имя/терминология — {вердикт}
- [ ] Guard'ы качества: category-error · forced-symmetry · substrate · false-second-axis — {отметки}
