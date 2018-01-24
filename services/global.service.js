const Global = require('../models/global.model');
_this = this;

exports.getTodos = async function(query, page, limit){
    const options = {
        page,
        limit,
        sort : {  last_updated : -1}
    };
    try {
        const global = await Global.paginate(query, options);
        return global;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
};