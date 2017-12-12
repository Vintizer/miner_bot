module.exports.getPoloniexBalance = ({ bot, chatId, user }) => {
    return new Promise((resolve, reject) => {
        resolve({ balance: "33Mh" })
    })
}
module.exports.setPoloniexBalance = ({ bot, chatId, user }) => {
    return new Promise((resolve, reject) => {
        resolve({ setted: true })
    })
}