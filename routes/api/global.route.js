const express = require('express');

const router = express.Router();


const GlobalController = require('../../controllers/global.controller');


// Map each API to the Controller FUnctions

router.get('/', GlobalController.getTodos);



module.exports = router;