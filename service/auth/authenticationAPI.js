const {
    findApiKeys
} = require('../../repositories/apiKeyRepository')


exports.authorize = async(apiKey) => {
    try{
        const apiKeyData = await findApiKeys(apiKey);
        return !!apiKeyData;
    }catch (error){
        throw error;
    }
}