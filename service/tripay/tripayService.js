const {PAYGATE_INFO} = require("../../config/tripay.config")
const {LIST_CHANNEL,CREATE_CLOSED_PAY} = require("../../constant/tripay.constant")
const axios = require("axios")
const axiosInstance = require("../../config/axios.config")
const generateSignatureClosedPay = (amount, merchantRef) => {
    try {
        return crypto.createHmac('sha256', PAYGATE_INFO.privateKey)
            .update(PAYGATE_INFO.merchantCode + merchantRef + amount)
            .digest('hex');
    } catch (e) {
        throw e
    }
}

const GetPaymentChannel = async () => {
    try {
        const response = await axiosInstance.get(LIST_CHANNEL);
        return response.data.data;
    }catch (e) {
        throw e
    }
}

const createPayment = async (method,orderRef,expired) => {
    try{
        const payload = {
            method,
            merchant_ref: orderRef.merhantRef,
            amount: orderRef.amount,
            customer_name: orderRef.customerName,
            customer_email: orderRef.customerEmail,
            customer_phone: orderRef.customerPhone,
            order_items: orderRef.orderItems,
            return_url: orderRef.returnUrl,
            expired_time: expired,
            signature: generateSignatureClosedPay(orderRef.amount,orderRef.merhantRef)
        }
        const response = await axiosInstance.post(CREATE_CLOSED_PAY,payload)
        return response.data.data
    }catch (e) {
        throw e
    }
}


module.exports = {
    GetPaymentChannel
}


