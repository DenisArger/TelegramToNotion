const TelegramBot = require("node-telegram-bot-api");
const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");

dotenv.config();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const notionApiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

const bot = new TelegramBot(telegramBotToken, { polling: true });

const notion = new Client({ auth: notionApiKey });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправьте приветственное сообщение при команде /start
  bot.sendMessage(
    chatId,
    "Добро пожаловать! Этот бот предназначен для взаимодействия с базой данных Notion."
  );
});

// Обработка команды /addrecord
bot.onText(/\/addrecord (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username;
  const recordText = match[1]; // Текст записи, который приходит от пользователя
  const currentDate = new Date().toISOString().split("T")[0]; // Текущая дата

  try {
    // Вызываем функцию addToDatabase для добавления записи в Notion
    await addToDatabase(databaseId, username, recordText, false, currentDate);

    // Отправляем уведомление о статусе в Telegram
    bot.sendMessage(chatId, "Запись успешно добавлена в Notion!");
  } catch (error) {
    console.error(error.body);
    bot.sendMessage(chatId, "Произошла ошибка при добавлении записи в Notion.");
  }
});

// Функция для добавления записи в Notion
async function addToDatabase(databaseId, username, name, status, date) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        ID: {
          title: [
            {
              type: "text",
              text: {
                content: username,
              },
            },
          ],
        },
        Name: {
          rich_text: [
            {
              type: "text",
              text: {
                content: name,
              },
            },
          ],
        },
        Status: {
          checkbox: status,
        },
        Date: {
          date: {
            start: date,
          },
        },
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error.body);
    throw error;
  }
}
