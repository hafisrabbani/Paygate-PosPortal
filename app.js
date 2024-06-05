const express = require('express');
const app = express();
const logger = require('morgan');
const helmet = require("helmet");
const cors = require("cors")
const {exceptionHandler} = require("./middleware/errorHandler");
require("dotenv").config({
    path: ".env"
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));


app.use('/webhooks', require('./routes/web/routes'));
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Service Running normally"
    })
});
app.use('/api/v1/payment', require('./routes/api/payment'));
app.use(helmet());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(exceptionHandler);
module.exports = app;