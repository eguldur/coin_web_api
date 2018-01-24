const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const coins = require('./api/coins.route');
const global = require('./api/global.route');
const realcur = require('./api/realCur.route');

router.use('/coins', coins);
router.use('/global', global);
router.use('/realcur', realcur);

router.get('/', function(req, res, next) {
    res.send(`Succesfully Connected to the Mongodb Database`);
});

module.exports = router;
