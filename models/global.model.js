const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const globalShema = new mongoose.Schema({
    _id: Number,
    total_market_cap_usd: Number,
    total_24h_volume_usd: Number,
    bitcoin_percentage_of_market_cap: Number,
    active_currencies: Number,
    active_assets: Number,
    active_markets: Number,
    last_updated: Number

});
globalShema.plugin(mongoosePaginate);
const Global = mongoose.model('coins_global', globalShema);
module.exports = Global;