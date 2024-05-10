const API = (isSandbox) =>{
    return isSandbox ? 'https://tripay.co.id/api-sandbox/' : 'https://tripay.co.id/api/';
}


module.exports = {
    PAYGATE_INFO: {
        apiBaseUrl: API(process.env.SANDBOX),
        merchantCode: process.env.MERCHANT_CODE,
        merchantKey: process.env.MERCHANT_KEY,
        privateKey: process.env.PRIVATE_KEY,
    }
}