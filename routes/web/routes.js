const express = require('express');
const router = express.Router();
const {
    GetQRISPayment,
    RealTimeStatusPayment,
    SuccessPayment
} = require('../../controller/webHookController');
router.get('/', GetQRISPayment);
router.get('/real-time-status-payment', RealTimeStatusPayment);
router.get('/success', SuccessPayment);
module.exports = router;