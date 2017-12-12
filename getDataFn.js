const { getData } = require("./db");
const R = require("rambda");
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

const getBalance = (market, { bot, chatId, user }) => {
    let dataKeys;
    let fnGetBalance;
    let fnSetKeys;
    switch (market) {
        case "bittrex":
            dataKeys = getData(user, "bittrex");
            fnGetBalance = getBittrexBalance;
            fnSetKeys = setBittrexKeys;
            break;
        case "poloniex":
            dataKeys = getData(user, "poloniex");
            fnGetBalance = getPoloniexBalance;
            fnSetKeys = setPoloniexKeys;
            break;
        default:
            break
    }
    if (dataKeys) {
        const secret = R.path(["secret"], dataKeys);
        const api = R.path(["api"], dataKeys);
        if (secret && api) {
            const balance = fnGetBalance();
            bot.sendMessage(chatId, balance)
        } else if (!secret || !api) {
            bot.sendMessage(chatId, "Пока еще в разработке...")
        }
    } else {
        bot.sendMessage(chatId, "Пока еще в разработке...")
    }
}

const getMineState = (pool, { bot, chatId, user }) => {
    let wallet;
    console.log('user', user);
    switch (pool) {
        case "ethermine":
            wallet = getData(user, "ethermine");
            fn = getEthermineStats;
            fnSet = setEthermineStats;
            command = "Отправь \"/ethermine и адрес кошелька через пробел"
            break;
        case "coinmine":
            wallet = getData(user, "coinmine");
            fn = getCoinmineStats;
            fnSet = setCoinmineStats;
            command = "В процессе разработки, пока только ethermine..."
            break;
        default:
            break;
    }
    console.log(wallet);
    console.log(R.path(["wallet"], wallet));
    if (R.path(["wallet"], wallet)) {
        bot.sendMessage(chatId, "Запрашиваем данные...")
        fn(wallet)
            .then((stats) => {
                bot.sendMessage(chatId, JSON.stringify(stats))
            })
    } else {
        bot.sendMessage(chatId, command)
        // if (fnSet({ bot, chatId, user }, wallet)) {
        //     console.log('fnSet');
        //     const stats = fn(user, wallet);
        //     bot.sendMessage(chatId, stats)
        // } else {
        //     console.log('fnSetELSE');
        //     bot.sendMessage(chatId, "Send valid Id, pls")
        // }
    }
}
const getBalanceBittrex = (bot, chatId, user) => {
    getBalance("bittrex", { bot, chatId, user });
};
const getBalancePolo = (bot, chatId, user) => {
    getBalance("poloniex", { bot, chatId, user });
};
const getMineStateEthermine = (bot, chatId, user) => {
    bot.sendMessage(chatId, "Запрашиваем данные...")
    getEthermineStats({ bot, chatId, user })
        .then((obj) => {
            bot.sendMessage(chatId, JSON.stringify(obj))
        });
};
const getMineStateCoinmine = (bot, chatId, user) => {
    getCoinmineStats({ bot, chatId, user })
        .then((obj) => {
            bot.sendMessage(chatId, JSON.stringify(obj))
        })
};

module.exports.getBalanceBittrex = getBalanceBittrex;
module.exports.getBalancePolo = getBalancePolo;
module.exports.getMineStateEthermine = getMineStateEthermine;
module.exports.getMineStateCoinmine = getMineStateCoinmine;