const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(`Succesfully Connected to the Mongodb Database`);

});

module.exports = router;
