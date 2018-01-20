const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/* GET users listing. */
router.get('/', function(req, res, next) {
    mongoose.connect('mongodb://localhost:27017/nodedemo')
        .then(()=> { res.send(`Succesfully Connected to the Mongodb Database`)})
        .catch(()=> { res.send(`Error Connecting to the Mongodb Database`)});
});

module.exports = router;
