# Memory Bank — TelegramToNotion

## Краткое описание
Telegram-бот на Node.js, который сохраняет пользовательские сообщения в базу Notion. Основная логика находится в `index.js`: обработка команд Telegram и создание страниц в Notion Database.

## Архитектура и поток данных
- Вход: команды Telegram (`/start`, `/addrecord <текст>`) и inline-кнопка `START`.
- Обработка: бот работает в режиме polling и реагирует на текстовые команды и callback.
- Выход: запись в Notion Database через официальный SDK.

## Интеграции
- Telegram Bot API через `node-telegram-bot-api`.
- Notion API через `@notionhq/client`.

## Схема базы Notion
Ожидаемые поля в базе:
- `ID` (Title) — username пользователя.
- `Name` (Rich text) — текст записи.
- `Status` (Checkbox) — статус (по умолчанию `false`).
- `Date` (Date) — дата записи в формате YYYY-MM-DD.

## Конфигурация окружения
Переменные `.env`:
- `TELEGRAM_BOT_TOKEN`
- `NOTION_API_KEY`
- `NOTION_DATABASE_ID`

## Команды и сценарии
- `/start` — отправляет приветствие.
- `START` (inline-кнопка) — подтверждение действия.
- `/addrecord <текст>` — создаёт запись в Notion.

## Скрипты
- `npm start` — запуск бота.

## Файлы и роли
- `index.js` — основной код бота и интеграции.
- `package.json` — зависимости и скрипты.
- `netlify.toml` — шаблон конфигурации, сейчас не используется.

## Известные ограничения
- Запуск только через polling (нет webhook-режима).
- В `package.json` нет build-скрипта.

## Идеи для расширения
- Добавить поддержку webhook.
- Локализация сообщений.
- Валидация входного текста и обработка ошибок Notion.
