const express = require('express');
const path = require('path');
const axios = require('axios');
const Coin = require('./models/coin.model');
const RealCur = require('./models/realCur.model');
const Global = require('./models/global.model');
const favicon = require('serve-favicon');
const logger = require('morgan');
const http = require('http');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./routes/index');


//mongoose.connect('mongodb://erdnur:2009501029Ab@ds263367.mlab.com:63367/node-demo')
mongoose.connect('mongodb://localhost:27017/nodedemo')
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database`)})
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database`)});
const app = express();
const api = require('./routes/api');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || '3000';
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));



setInterval(function (req, res) {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=1500')
        .then(response => {
            const jsonContent2 = response.data;
            jsonContent2.forEach(function (item) {
                const coin ={
                    _id:item['id'],
                    name: item['name'],
                    symbol: item['symbol'],
                    rank: item['rank'],
                    last_updated: item['last_updated'],
                    price_usd: item['price_usd'],
                    price_btc: item['price_btc'],
                    market_data:  [{
                        a24h_volume_usd: item['24h_volume_usd'],
                        market_cap_usd: item['market_cap_usd'],
                        available_supply: item['available_supply'],
                        total_supply: item['total_supply'],
                        max_supply: item['max_supply'],
                        percent_change_1h: item['percent_change_1h'],
                        percent_change_24h: item['percent_change_24h'],
                        percent_change_7d: item['percent_change_7d'],
                        last_updated: item['last_updated'],
                        price_usd: item['price_usd'],
                        price_btc: item['price_btc'],
                    }]

                };
                Coin.findOneAndUpdate({
                    _id: item['id']
                }, coin, { upsert: true }, function(err, res) {
                    console.log(res);
                });
            })
        })
        .catch(error => {
            console.log(error);
        });
}, 300000);

setInterval(function (req, res) {
    axios.get('https://api.coinmarketcap.com/v1/global/')
        .then(response => {
            const globalData = response.data;
            const global ={
                _id:globalData['last_updated'],
                total_market_cap_usd: globalData['total_market_cap_usd'],
                total_24h_volume_usd: globalData['total_24h_volume_usd'],
                bitcoin_percentage_of_market_cap: globalData['bitcoin_percentage_of_market_cap'],
                active_currencies: globalData['active_currencies'],
                active_assets: globalData['active_assets'],
                active_markets: globalData['active_markets'],
                last_updated:globalData['last_updated'],
            };
            Global.findOneAndUpdate({
                _id: globalData['last_updated']
            }, global, { upsert: true }, function(err, res) {
                if(err) {
                }
                else if(res) {
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}, 300000);

setInterval(function (req, res) {
    axios.get('https://openexchangerates.org/api/latest.json?app_id=04b4b883f2974a8ba4529318c9a1883a')
        .then(response => {
            const realData = response.data;
            const realcur ={
                _id: realData['timestamp'],
                timestamp: realData['timestamp'],
                base: realData['base'],
                rates: realData['rates']
            };
            RealCur.findOneAndUpdate({
                _id: realData['timestamp']
            }, realcur, { upsert: true }, function(err, res) {
                if(err) {
                }
                else if(res) {
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}, 7200000);

module.exports = app;
