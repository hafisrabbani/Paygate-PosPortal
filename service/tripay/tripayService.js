const {PAYGATE_INFO} = require("../../config/tripay.config")
const {LIST_CHANNEL,CREATE_CLOSED_PAY,GET_STATUS_PAYMENT} = require("../../constant/tripay.constant")
const {
    createPayment : insertPayment,
    getPayment,
    updatePayment
} = require('../../repositories/paymentRepository');
const axiosInstance = require("../../config/axios.config")
const crypto = require('crypto');
const generateSignatureClosedPay = (amount, merchantRef) => {
    try {
        const data = PAYGATE_INFO.merchantCode + merchantRef + amount;
        return crypto.createHmac('sha256', PAYGATE_INFO.privateKey)
            .update(data)
            .digest('hex')
    } catch (e) {
        throw e
    }
}

const generateSignatureCallback = (data) => {
    try {
        const dataString = JSON.stringify(data);
        return crypto.createHmac('sha256', PAYGATE_INFO.privateKey)
            .update(dataString)
            .digest('hex')
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

const CreatePayment = async (order_id) => {
    try{
        const data = await getPayment(order_id);
        if(data.payment_reference){
            return GetStatusPayment(order_id);
        }
        const signature = generateSignatureClosedPay(data.amount,data.order_id)
        const payload = {
            method: data.method,
            merchant_ref: data.order_id,
            amount: data.amount,
            customer_name: "default",
            customer_email: "default@gmail.com",
            customer_phone: "08123456789",
            order_items: data.product_detail,
            return_url: "http://localhost:3000/redirect",
            expired_time: data.expired_time,
            signature: signature
        }

        const response = await axiosInstance.post(CREATE_CLOSED_PAY,payload)
        await updatePayment({
            order_id: data.order_id,
            payment_reference: response.data.data.reference
        });
        return response.data.data
    }catch (e) {
        console.log(e.response.data)
        throw e
    }
}

const InsertPaymentDB = async (data) => {
    try{
        const getData = await getPayment(data.order_id);
        if(getData) return false;
        const insert = await insertPayment(
            {
                order_id: data.order_id,
                amount: data.amount,
                method: data.method,
                product_detail: JSON.stringify(data.product_detail),
                status: false,
                expired_time: data.expired_time,
            }
        );
        return !!insert;
    }catch (error){
        throw error;
    }
}

const GetStatusPayment = async (order_id) => {
    try{
        const data = await getPayment(order_id);
        if(!data) return null;
        const response = await axiosInstance.get(GET_STATUS_PAYMENT,{
            params: {
                reference: data.payment_reference
            }
        })
        return response.data.data
    }catch (e) {
        console.log(e.response.data)
        throw e
    }
}


const HandleCallback = async (data) => {
    try{
        const {merchant_ref,status} = data;
        const update = await updatePayment({
            order_id: merchant_ref,
            status: (status === "PAID"),
        });
        return !!update;
    }catch (e) {
        throw e
    }
}


module.exports = {
    GetPaymentChannel,
    CreatePayment,
    InsertPaymentDB,
    GetStatusPayment,
    HandleCallback,
    generateSignatureCallback,
}


