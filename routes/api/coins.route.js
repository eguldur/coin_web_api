const express = require('express');

const router = express.Router();


const CoinControleer = require('../../controllers/coin.controller');


// Map each API to the Controller FUnctions

router.get('/', CoinControleer.getTodos);

router.post('/', CoinControleer.createTodo);

router.put('/', CoinControleer.updateTodo);

router.delete('/:id',CoinControleer.removeTodo);


// Export the Router

module.exports = router;