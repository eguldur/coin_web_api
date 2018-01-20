const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(`Succesfully Connected to the Mongodb Database`);
    mongoose.connect('mongodb://erdnur:2009501029Ab@ds263367.mlab.com:63367/node-demo')
        .then(()=> { res.send(`Succesfully Connected to the Mongodb Database`)})
        .catch(()=> { res.send(`Error Connecting to the Mongodb Database`)});

});

module.exports = router;
