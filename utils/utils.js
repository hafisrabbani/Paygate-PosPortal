const moment = require('moment');

exports.generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.generateTime = (time, type) => {
    const availTime = {
        MINUTES: 'minutes',
        HOURS: 'hours',
        DAYS: 'days',
    }

    try {
        switch (type) {
            case availTime.MINUTES:
                return moment().add(time, 'minutes').unix();
            case availTime.HOURS:
                return moment().add(time, 'hours').unix();
            case availTime.DAYS:
                return moment().add(time, 'days').unix();
            default:
                throw new Error('Invalid time type');
        }
    }catch (error){
        throw error;
    }
}

exports.convertTime = (time) => {
    return moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
}