# Scripts

## sync-talents-guide.js

Синхронизирует данные талантов из Google Sheets в `src/data/talents-guide.ts`.

**Таблица:** [talents-guide](https://docs.google.com/spreadsheets/d/1eTjeMwzIB06nw5tEPctEg6EEGFLD_6o4nYgWl8fNsUs/edit?gid=1715408052#gid=1715408052)

**Требование:** Таблица должна быть опубликована в веб (File → Share → Publish to web).

**Запуск:**

```bash
node scripts/sync-talents-guide.js
```

или

```bash
npm run sync:talents
```

Скрипт скачивает CSV-экспорт таблицы и генерирует TypeScript-файл с интерфейсом и массивом талантов.

**Колонки в таблице:** Ветка (A), Ранг (B), Название (C), Описание (D). Первая строка — заголовки.
