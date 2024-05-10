const axios = require("axios")
const { PAYGATE_INFO } = require("./tripay.config");

const axiosInstance = axios.create({
    baseURL: PAYGATE_INFO.apiBaseUrl,
    headers: {
        'Authorization': 'Bearer ' + PAYGATE_INFO.merchantKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});


module.exports = axiosInstance;