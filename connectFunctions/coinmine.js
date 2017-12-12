module.exports.getCoinmineStats = ({ bot, chatId, user }) => {
    return new Promise((resolve, reject) => {
        resolve({ balance: "22Mh" })
    })
    // https://www2.coinmine.pl/dcr/index.php?page=api&action=getuserbalance&api_key=cc27c9e4d045ad7f9168b69eaa35ae3078b8099d3fad2ddd83a752826d801391&id=13638
    // https://github.com/MPOS/php-mpos/wiki/API-Reference
}
module.exports.setCoinmineStats = ({ bot, chatId, user }) => {
    return new Promise((resolve, reject) => {
        resolve({ setted: true })
    })
}