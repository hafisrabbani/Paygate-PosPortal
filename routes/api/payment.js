const express = require('express');
const router = express.Router();

const {GetPaymentChannel} = require("../../controller/tripayController")

router.get('/get-payment-channel', GetPaymentChannel)

module.exports = router;