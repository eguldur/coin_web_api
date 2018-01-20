const Coin = require('../models/coin.model')
_this = this;

exports.getTodos = async function(query, page, limit){
    const options = {
        page,
        limit,
        select: {market_data:0  },
        sort : {  rank : 1}

};
    try {
        const coins = await Coin.paginate(query, options);
        return coins;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createTodo = async function(todo){
    const newTodo = new Coin({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    });
    try{
        const savedTodo = await newTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("Error while Creating Todo")
    }
};

exports.updateTodo = async function(todo){
    const id = todo.id;
    try{
        const oldTodo = await ToDo.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }
    if(!oldTodo){
        return false;
    }
    console.log(oldTodo);
    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;
    console.log(oldTodo);
    try{
        const savedTodo = await oldTodo.save();
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
};

exports.deleteTodo = async function(id){
    try{
        const deleted = await ToDo.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted");
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo");
    }
}