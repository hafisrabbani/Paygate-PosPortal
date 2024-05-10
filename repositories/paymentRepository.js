const db = require('../config/db.config');
const moment = require('moment');
exports.createPayment = async(data) => {
    try{
        const {
            order_id,
            amount,
            method,
            product_detail,
            expired_time
        } = data;
        const insert = await db('list_payment').insert(
            {
                order_id,
                amount,
                method,
                product_detail: product_detail,
                status: false,
                expired_time,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        );
        return !!insert;
    }catch (error){
        throw error;
    }
}

exports.updatePayment = async(data) => {
    try{
        const {
            order_id,
            status,
            payment_reference
        } = data;
        const oldData = await db('list_payment').where({order_id}).first();
        const update = await db('list_payment').where({order_id}).update(
            {
                status: (status) ? status : oldData.status,
                payment_reference: (payment_reference) ? payment_reference : oldData.payment_reference,
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        );
        return !!update;
    }catch (error){
        throw error;
    }
}


exports.getPayment = async(order_id) => {
    try{
        const data = await db('list_payment').where({order_id}).first();
        if(!data) return null;
        data.product_detail = JSON.parse(data.product_detail);
        return data;
    }catch (error){
        throw error;
    }
}

exports.getPayments = async() => {
    try{
        const data = await db('list_payment').select('*');
        return data.map(item => {
            item.orderItems = JSON.parse(item.product_detail);
            return item;
        });
    }catch (error){
        throw error;
    }
}