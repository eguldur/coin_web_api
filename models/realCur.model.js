const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const realcurShema = new mongoose.Schema({
    _id: Number,
    timestamp: Number,
    base: String,
    rates: {

    }
});
realcurShema.plugin(mongoosePaginate);
const RealCur = mongoose.model('real_cur', realcurShema);
module.exports = RealCur;