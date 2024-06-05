const moment = require('moment-timezone');
const CryptoJS = require('crypto-js');
exports.generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.generateTime = (time) => {
    moment.tz.setDefault("Asia/Jakarta");
    console.log("current time: ", moment().unix())
    console.log("current time in string: ", moment().format('YYYY-MM-DD HH:mm:ss'))
    console.log("expired time: ", moment().add(time, 'minutes').unix())
    console.log("expired time in string: ", moment().add(time, 'minutes').format('YYYY-MM-DD HH:mm:ss'))
    return moment().add(time, 'minutes').unix();
}

exports.convertTime = (time) => {
    return moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
}

exports.encryptAES = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
}

exports.decryptAES = (text, key) => {
    return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}