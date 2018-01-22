const CoinService = require('../services/coin.service')

// Saving the context of this module inside the _the constiable

_this = this;


// Async Controller function to get the To do List

exports.getTodos = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 10;

    try{

        const todos = await CoinService.getTodos({}, page, limit);


        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message + limit});

    }
};

exports.getTodosList = async function(req, res, next){

    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 10;
    try{
        const todos = await CoinService.getTodosList({}, page, limit);
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
    }catch(e){

        return res.status(400).json({status: 400, message: e.message + limit});

    }
};

exports.getTodo = async function(req, res, next){

    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 10;
    const id = req.query._id ? req.query._id : 'bitcoin';
    try{
        const todos = await CoinService.getTodo({_id : id}, page, limit);
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
    }catch(e){

        return res.status(400).json({status: 400, message: e.message + limit});

    }
};

exports.createTodo = async function(req, res, next){

    // Req.Body contains the form submit values.

    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try{

        // Calling the Service function with the new object from the Request Body

        const createdTodo = await CoinService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
};

exports.updateTodo = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    const id = req.body._id;

    console.log(req.body)

    const todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        const updatedTodo = await CoinService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
};

exports.removeTodo = async function(req, res, next){

    const id = req.params.id;

    try{
        const deleted = await CoinService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}