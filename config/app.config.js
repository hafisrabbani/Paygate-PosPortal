module.exports = {
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || 'development',
    timezone: process.env.APP_TIMEZONE || 'Asia/Jakarta',
    url: process.env.APP_URL || 'http://localhost:3000',
    name: process.env.APP_NAME || 'Paygate POS Portal',
    length_api_key: process.env.APP_LENGTH_API_KEY || 32,
    app_key: process.env.APP_KEY || 'base64:q3Zz3',
}