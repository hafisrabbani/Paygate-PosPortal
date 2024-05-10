const moment = require('moment');
const {generateTime,convertTime} = require('../utils/utils');
const generatedTime = generateTime(1, 'minutes');
console.log(generatedTime);
console.log(convertTime(generatedTime));
