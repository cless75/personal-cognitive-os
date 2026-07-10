# Добавить экзокортекс в уже существующий проект Cowork

Если у тебя уже есть проект в Claude Cowork (папка с работой) и ты хочешь встроить в него Personal Cognitive OS — не нужно заводить отдельный репозиторий. Инициируй **in-place**, недеструктивно.

## Предпосылка — навыки установлены

Cowork не читает `.claude/skills` из папки автоматически. Установи навыки один раз (на уровне пользователя, чтобы были во всех проектах):

1. Скачай seed: `git clone https://github.com/cless75/personal-cognitive-os` (в любой каталог — нужен только для сборки ZIP/плагина).
2. Установи `/init-exocortex` как user-level навык: Settings → Capabilities → Skills → Upload → `distributions/init-exocortex.zip` (сборка — в [`distributions/README.md`](../distributions/README.md)).
3. (Опц.) Установи остальные навыки: плагин из папки (Settings → Plugins → Install from folder → `.claude-plugin/`) или ZIP `personal-cognitive-os-skills.zip`.

## Инициация in-place

1. Открой свой существующий проект в Cowork.
2. Запусти `/init-exocortex` → выбери режим **B. В существующий проект (in-place)**.
3. Навык просканирует папку, покажет что уже есть и **добавит только недостающее**:
   - папки `concepts/`, `About-Me/`, `sources/`, `projects/`, `daily/`, `onboarding/`;
   - в твой `CLAUDE.md` **допишет** секцию «Personal Cognitive OS» + блок карты проектов (существующее содержимое не трогается);
   - установит/подхватит навыки.
4. Ответь на короткие вопросы `init-me` (профиль), не затирая уже имеющийся контекст.
5. Дальше как обычно: файл в `sources/` → `/review-concepts`.

## Гарантия недеструктивности

- Существующие файлы **не удаляются и не перезаписываются**.
- В `CLAUDE.md` правится только дописанный блок между маркерами `projects-map`.
- Одноимённые папки/навыки проекта сохраняются как есть.
