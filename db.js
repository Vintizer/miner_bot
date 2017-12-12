const fs = require("fs");
const R = require("rambda");

const getData = (userName, data) => {
    return new Promise((resolve, reject) => {
        const db = require("./dataBase/main.json");
        const res = R.path(["users", userName, data], db);
        resolve(res);
    })
}
const setData = (userName, data, cb) => {
    console.log('setData');
    const db = require("./dataBase/main.json");
    const userData = { users: db.users };
    userData.users[userName] = data;
    console.log('db', db);
    console.log('userData', userData);
    const res = R.merge(db, userData)
    const resJson = JSON.stringify(res);
    fs.writeFile("./dataBase/main.json", resJson, 'utf8');
    cb();
}
const setDataForUser = (userName, dataObj, cb) => {
    const db = require("./dataBase/main.json");
    const res = R.path(["users", userName], db);
    if (res) {
        db.users[userName] = R.merge(res, dataObj);
        const dbJson = JSON.stringify(db);
        fs.writeFile("./dataBase/main.json", dbJson, 'utf8');
        cb(true);
    } else {
        setData(userName, dataObj, () => { cb(true) })
        // cb(false);
    }
}
module.exports.getData = getData;
module.exports.setData = setData;
module.exports.setDataForUser = setDataForUser;