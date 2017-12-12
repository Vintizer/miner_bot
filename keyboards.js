const inline_keyboard = [
    [
        {
            text: 'Баланс',
            callback_data: 'get_balance'
        }
    ],
    [
        {
            text: 'Добыча',
            callback_data: 'mine_state'
        }
    ]
];
const balance_keyboard = [
    [
        {
            text: 'Poloniex',
            callback_data: 'get_balance_polo'
        }
    ],
    [
        {
            text: 'Bittrex',
            callback_data: 'get_balance_bittrex'
        }
    ]
];
const mine_keyboard = [
    [
        {
            text: 'Ethermine',
            callback_data: 'mine_state_ethermine'
        }
    ],
    [
        {
            text: 'Coinmine',
            callback_data: 'mine_state_coinmine'
        }
    ]
];
module.exports.inline_keyboard = inline_keyboard;
module.exports.balance_keyboard = balance_keyboard;
module.exports.mine_keyboard = mine_keyboard;