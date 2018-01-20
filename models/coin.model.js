const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const coinShema = new mongoose.Schema({
    _id: String,
    name: String,
    symbol: String,
    rank: String,
    last_updated: String,
    price_usd: String,
    price_btc: String,
    market_data : [{
        a24h_volume_usd: String,
        market_cap_usd: String,
        available_supply: String,
        total_supply: String,
        percent_change_1h: String,
        percent_change_24h:String,
        percent_change_7d: String,
        price_usd: String,
        price_btc: String,
        max_supply: String,
        last_updated: String
    }]
});
coinShema.plugin(mongoosePaginate);
const Coin = mongoose.model('coins_base', coinShema);
module.exports = Coin;