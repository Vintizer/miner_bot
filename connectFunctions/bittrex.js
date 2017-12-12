module.exports.getBittrexBalance = ({ bot, chatId, user }) => {
    return new Promise((resolve, reject) => {
        resolve({ balance: "$17000" })
    })
}
module.exports.setBittrexBalance = ({ bot, chatId, user }) => {
    return new Promise((resolve, reject) => {
        resolve({ setted: true })
    })
}