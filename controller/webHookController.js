const {
    GetStatusPayment,
    RealTimeStatusPayment
} = require('../service/tripay/tripayService')
const {
    convertTime
} = require('../utils/utils')
const {errorHandler} = require("../middleware/errorHandler");
const moment = require('moment')
const appConfig = require('../config/app.config')
const {getPayment} = require("../repositories/paymentRepository");
exports.GetQRISPayment = async (req, res, next) => {
    try {
        const {
            order_id
        } = req.query
        if (!order_id) return errorHandler({type: 'BadRequestError'}, req, res, next);
        const data = await GetStatusPayment(order_id)
        const dataLocal = await getPayment(order_id);
        if (!data) return errorHandler({type: 'NotFoundError'}, req, res, next);
        const realTimeStatus = `${appConfig.url}/webhooks/real-time-status-payment?order_id=${order_id}`
        const redirectUrl = `${appConfig.url}/webhooks/success?order_id=${order_id}`
        const response = {
            order_id: order_id,
            reference: data.reference,
            merchant_ref: data.merchant_ref,
            amount: data.amount,
            qr_url: data.qr_url,
            expired_time: moment(convertTime(dataLocal.expired_time)).format('MM-DD-YYYY HH:mm:ss'),
            real_time_status: realTimeStatus,
            redirect_url: redirectUrl
        }
        return res.render('index', {
            data: response
        });
    } catch (error) {
        next(error)
    }
}

exports.RealTimeStatusPayment = async (req, res, next) => {
    try {
        const {
            order_id
        } = req.query
        if (!order_id) return errorHandler({type: 'BadRequestError'}, req, res, next);
        const data = await RealTimeStatusPayment(order_id)
        if (data === null) return errorHandler({type: 'NotFoundError'}, req, res, next);
        const isExpired = moment().unix() > data.expired_time
        console.log("isExpired: ", isExpired)
        console.log(moment().unix())
        console.log(data.expired_time)
        return res.status(200).json({
            message: "Success",
            data: {
                order_id: order_id,
                status: data,
                is_expired: isExpired
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.SuccessPayment = async (req, res, next) => {
    try {
        const {
            order_id
        } = req.query

        if (!order_id) return errorHandler({type: 'BadRequestError'}, req, res, next);
        const status = await RealTimeStatusPayment(order_id)
        if(!status) return res.redirect('/webhooks/?order_id='+order_id)
        return res.render('success',{
            order_id
        });
    } catch (error) {
        next(error)
    }
}


exports.ErrorPayment = async (req, res, next) => {
    try {
        const order_id = req.query.order_id
        return res.render('error',{
            order_id
        });
    } catch (error) {
        next(error)
    }
}

exports.health = async (req, res, next) => {
    return res.render('health');
}