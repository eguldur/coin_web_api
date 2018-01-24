const RealCurService = require('../services/realCur.service');

_this = this;

exports.getTodos = async function(req, res, next){

    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 10;

    try{

        const todos = await RealCurService.getTodos({}, page, limit);


        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message + limit});

    }
};
