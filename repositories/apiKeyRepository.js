const db = require('../config/db.config');
const {generateRandomString} = require('../utils/utils');
exports.findApiKeys = async(apikey) => {
    try{
        return await db('api_keys').where({api_key: apikey}).first();
    }catch (error){
        throw error;
    }
}

exports.createApiKey = async(length) => {
    try{
        const apiKey = generateRandomString(length);
        return await db('api_keys').insert({api_key: apiKey});
    }catch (error){
        throw error;
    }
}

exports.deleteApiKey = async(apikey) => {
    try{
        return await db('api_keys').where({api_key: apikey}).del();
    }catch (error){
        throw error;
    }
}

exports.getApiKeys = async() => {
    try{
        return await db('api_keys').select('api_key');
    }catch (error){
        throw error;
    }
}