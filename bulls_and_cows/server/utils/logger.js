const fileHandler = require('./fileHandler');
const moment = require('moment');

module.exports = (num, guess, win) => {
    let file = './server/logs/log.txt';

    let logItem = `
        ***ROUND*** \n
        ${moment().format('DD.MMMM.YYYY hh:mm:ss')}
        Загаданное число: ${num}
        Количество попыток: ${guess}
        Выйграл: ${win} \n
        ***END***
    `;
    fileHandler.readAndWrite(file, logItem);
};