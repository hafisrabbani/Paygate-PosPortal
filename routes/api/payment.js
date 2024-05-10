const express = require('express');
const router = express.Router();
const autorize = require('../../middleware/apiAuthorization');
const {
    GetPaymentChannel,
    CreateTransaction,
    GetStatusPayment,
    CreatePayment,
    HandleCallback
} = require("../../controller/tripayController")

router.get('/get-payment-channel', GetPaymentChannel);
router.post('/create-transaction', CreateTransaction);
router.post('/create-payment', CreatePayment);
router.get('/get-status-payment', GetStatusPayment);
router.post('/callback', HandleCallback);
module.exports = router;