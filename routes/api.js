const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const coins = require('./api/coins.route')

router.use('/coins', coins);

router.get('/', function(req, res, next) {
    res.send(`Succesfully Connected to the Mongodb Database`);


});

module.exports = router;
