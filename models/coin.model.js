const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const coinShema = new mongoose.Schema({
    _id: String,
    name: String,
    symbol: String,
    rank: Number,
    last_updated: Number,
    price_usd: Number,
    price_btc: Number,
    market_data : [{
        a24h_volume_usd: Number,
        market_cap_usd: Number,
        available_supply: Number,
        total_supply: Number,
        percent_change_1h: Number,
        percent_change_24h:Number,
        percent_change_7d: Number,
        price_usd: Number,
        price_btc: Number,
        max_supply: Number,
        last_updated: Number
    }],
    social_data : [{
        twitter: String,
        facebook: String,
        reddit: String,
        bitcointalk: String,
        chat: String,
        board: String
    }],
    technical_data : [{
        explorer: String,
        code: String,
        whitepaper: String,
        mineable: Number,
        coin_type: String,
        web: String,
        crypto_type: String
    }]
});
coinShema.plugin(mongoosePaginate);
const Coin = mongoose.model('coins_base', coinShema);
module.exports = Coin;