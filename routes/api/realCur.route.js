const express = require('express');

const router = express.Router();


const RealCurController = require('../../controllers/realCur.controller');


// Map each API to the Controller FUnctions

router.get('/', RealCurController.getTodos);



module.exports = router;