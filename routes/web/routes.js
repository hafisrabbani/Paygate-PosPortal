const express = require('express');
const router = express.Router();
const {
    GetQRISPayment,
    RealTimeStatusPayment,
    SuccessPayment,
    ErrorPayment
} = require('../../controller/webHookController');
router.get('/', GetQRISPayment);
router.get('/real-time-status-payment', RealTimeStatusPayment);
router.get('/success', SuccessPayment);
router.get('/failed', ErrorPayment);
module.exports = router;