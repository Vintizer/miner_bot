const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '324931197:AAEz3Ajb1Rtri34DgcGAikVEqxyCLF9NxZY'

const options = {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
}

module.exports = new TelegramBot(TOKEN, options)