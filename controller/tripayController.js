const {
    GetPaymentChannel,
    CreatePayment,
    InsertPaymentDB,
    GetStatusPayment,
    HandleCallback,
    generateSignatureCallback
} = require("../service/tripay/tripayService")
const {errorHandler} = require('../middleware/errorHandler');
const {generateTime} = require('../utils/utils');
const appConfig = require('../config/app.config');
exports.GetPaymentChannel = async (req, res, next) => {
    try {
        const data = await GetPaymentChannel()
        return res.status(200).json({
            message: "Success",
            data
        })
    } catch (error) {
        next(error);
    }
}

exports.CreateTransaction = async (req, res, next) => {
    try {
        const {
            order_id,
            amount,
            expired_minute
        } = req.body
        if (!order_id || !amount || !expired_minute) return errorHandler({type: 'BadRequestError'}, req, res, next);
        const expired_time = generateTime(expired_minute)
        const data = await InsertPaymentDB(
            {
                order_id,
                amount,
                method: "QRIS",
                product_detail: [
                    {
                        "sku": "PRODUCT",
                        "name": "PRODUCT",
                        "price": amount,
                        "quantity": 1
                    }
                ],
                expired_time: expired_time
            },
        )
        if(!data) return errorHandler({type: 'DuplicateError'}, req, res, next);
        return res.status(200).json({
            message: "Success",
            data:{
                status: data,
                order_id,
            }
        })
    } catch (error) {
        next(error);
    }
}

exports.CreatePayment = async (req, res, next) => {
    try {
        const {
            order_id,
        } = req.body
        if (!order_id) return errorHandler({type: 'BadRequestError'}, req, res, next);

        const data = await CreatePayment(order_id)
        const webhookUrl = appConfig.url+'/webhooks/?order_id='+order_id
        return res.status(200).json({
            message: "Success",
            data,
            webhook_url: webhookUrl
        });
    }catch (error) {
        next(error);
    }
}

exports.GetStatusPayment = async (req, res, next) => {
    try {
        const {
            order_id
        } = req.query
        if (!order_id) return errorHandler({type: 'BadRequestError'}, req, res, next);
        const data = await GetStatusPayment(order_id)
        return res.status(200).json({
            message: "Success",
            data
        });
    }catch (error) {
        next(error);
    }
}

exports.HandleCallback = async (req, res, next) => {
    try {
        const data= req.body
        const signatureCallback = req.headers['x-callback-signature'];
        const eventCallback = req.headers['x-callback-event'];
        const validatorSignature = generateSignatureCallback(data)
        console.log(data);
        if (signatureCallback !== validatorSignature || 'payment_status' !== eventCallback) {
            return errorHandler({ type: 'UnauthorizedError' }, req, res, next);
        }
        await HandleCallback(data)
        return res.status(200).json({
            success: true,
        })
    }catch (error) {
        next(error);
    }
}