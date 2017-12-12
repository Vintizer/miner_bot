const bot = require("./bot")
const debug = require('./helpers');
const { balance_keyboard, inline_keyboard, mine_keyboard } = require("./keyboards")
const { getData, setData, setDataForUser } = require("./db")
const {
    getEthermineStats,
    setEthermineStats,
    getCoinmineStats,
    setCoinmineStats,
    getBittrexStats,
    setBittrexStats,
    getPoloniexStats,
    setPoloniexStats
} = require("./connectFunctions/")

const onCallbackQuery = query => {
    console.log('callback_query');
    console.log(query);
    const { chat, message_id, text, from } = query.message
    const { username: user, id: chatId } = chat
    switch (query.data) {
        case 'get_balance':
            // куда, откуда, что
            bot.sendMessage(chatId, 'Выбери биржу:', {
                reply_markup: {
                    inline_keyboard: balance_keyboard
                }
            })
            break
        case 'mine_state':
            bot.sendMessage(chatId, 'Выбери пул:', {
                reply_markup: {
                    inline_keyboard: mine_keyboard
                }
            })
            break
        case 'get_balance_bittrex':
            getBalanceBittrex({ bot, chatId, user })
            .then((obj) => {
                bot.sendMessage(chatId, JSON.stringify(obj))
            });
            break
        case 'get_balance_polo':
            getBalancePolo({ bot, chatId, user })
            .then((obj) => {
                bot.sendMessage(chatId, JSON.stringify(obj))
            });
            break
        case 'mine_state_ethermine':
            getEthermineStats({ bot, chatId, user })
                .then((obj) => {
                    bot.sendMessage(chatId, JSON.stringify(obj))
                });
            break
        case 'mine_state_coinmine':
            getMineStateCoinmine({ bot, chatId, user })
            .then((obj) => {
                bot.sendMessage(chatId, JSON.stringify(obj))
            });
            break
    }
}

const onTextStart = (msg) => {
    console.log('start');
    console.log(msg);
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Выбери действие: ', {
        reply_markup: {
            inline_keyboard
        }
    })
}

const onTextEthermine = (msg, arr) => {
    console.log('text ethermine');
    console.log(msg);
    console.log(arr);
    const { id, username } = msg.chat;
    const wallet = arr[1];
    const regEth = /^(0x)?[0-9a-fA-F]{40}$/;
    if (regEth.test(wallet)) {
        setDataForUser(username, {
            "ethermine": {
                wallet
            }
        }, (res) => {
            if (res) {
                bot.sendMessage(id, 'Спасибо, адрес сохранен. Вы можете запрашивать статистику по ethermine')
                bot.sendMessage(id, 'Выбери пул:', {
                    reply_markup: {
                        inline_keyboard: mine_keyboard
                    }
                })
            }
        })
    } else {
        bot.sendMessage(id, 'Адрес кошелька не валидный')
    }
}
module.exports.onCallbackQuery = onCallbackQuery;
module.exports.onTextStart = onTextStart;
module.exports.onTextEthermine = onTextEthermine;