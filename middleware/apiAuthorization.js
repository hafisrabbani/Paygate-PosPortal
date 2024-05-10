const { authorize } = require('../service/auth/authenticationAPI');
const { errorHandler } = require('./errorHandler');

module.exports = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
            return errorHandler({ type: 'UnauthorizedError' }, req, res, next);
        } else {
            const isAuthorized = await authorize(apiKey);
            if (!isAuthorized) {
                return errorHandler({ type: 'UnauthorizedError' }, req, res, next);
            }
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
