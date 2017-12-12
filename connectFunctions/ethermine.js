const { getData } = require("../db");
const R = require("rambda");
var fetch = require('node-fetch');
const https = require('https');

const get_json = (url, callback) => {
    https.get(url, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var response = JSON.parse(body);
            callback(response);
        });
    });
}

module.exports.getEthermineStats = ({ bot, chatId, user }) => {
    console.log('getEthermineStats');
    return new Promise((resolve, reject) => {
        wallet = getData(user, "ethermine")
            .then(({ wallet }) => {
                return "https://api.ethermine.org/miner/" + wallet + "/currentStats";
            })
            .then((strReq) => {
                get_json(strReq, function ({ data }) {
                    const hashrate = (stringHashrate) => {
                        return parseInt(parseInt(stringHashrate) / 1000000);
                    }
                    const balance = parseInt(data.unpaid) / 1e18;
                    const lastSeen = parseInt((parseInt(data.time) - parseInt(data.lastSeen)) / 60);
                    const curHashrate = hashrate(data.currentHashrate);
                    const repHashrate = hashrate(data.reportedHashrate);
                    const aveHashrate = hashrate(data.averageHashrate);
                    const workers = data.activeWorkers;
                    const money = data.usdPerMin * 30 * 24 * 60;
                    resolve({
                        balance,
                        lastSeen,
                        curHashrate,
                        aveHashrate,
                        workers,
                        money
                    });
                })
            })
    })
};

module.exports.setEthermineStats = ({ bot, chatId }) => {
    bot.sendMessage(chatId, "Отправь \"/ethermine и адрес кошелька через пробел")
    return false;
}