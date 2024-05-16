const moment = require('moment');

exports.generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.generateTime = (time) => {
    // add expired 1 minute with current time and unix time
    console.log("current time: ", moment().unix())
    console.log("expired time: ", moment().add(time, 'minutes').unix())
    return moment().add(time, 'minutes').unix();
}

exports.convertTime = (time) => {
    return moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
}