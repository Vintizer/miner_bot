const { onCallbackQuery, onTextEthermine, onTextStart } = require("./listenFunctions")
const bot = require("./bot")

bot.onText(/\/start/, onTextStart);
bot.on('callback_query', onCallbackQuery);
bot.onText(/\/ethermine (.+)/, onTextEthermine);