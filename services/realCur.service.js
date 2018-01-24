const RealCur = require('../models/realCur.model');
_this = this;

exports.getTodos = async function(query, page, limit){
    const options = {
        page,
        limit,
        sort : {  timestamp : -1}
    };
    try {
        const realcur = await RealCur.paginate(query, options);
        return realcur;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
};