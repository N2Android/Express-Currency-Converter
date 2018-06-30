var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, resApp, next) {

    let baseUrl = 'https://free.currencyconverterapi.com/api/v5/';

    function getCurrencies() {
        let https = require('https');
        let url = baseUrl + 'currencies';
        return new Promise( (resolve, reject) => {
            https.get(url, function(res) {
                let body = '';

                res.on('data', function(chunk) {
                    body += chunk;
                    console.log(body);
                });

                res.on('end', function() {
                    try {
                        //Parse the JSON string
                        let currenciesResponseJson = JSON.parse(body);
                        /*console.log('Response: ');
                        console.log(currenciesResponseJson);
                        console.log('Results - start');*/
                        let results = currenciesResponseJson.results;
                        /*console.log(results);
                        console.log('Results - end');*/
                        resolve(Object.keys(results));
                    } catch (e) {
                        console.log("Parse error: ", e);
                        reject("Got an error: ", e.message);
                    }
                });
            }).on('error', function(e) {
                console.log("Got an error: ", e);
                reject("Got an error: ", e.message);
            });
        });
    }

    getCurrencies().then( (currencies) => {
        console.log(currencies);
        resApp.render('index', { title: 'Currency Converter App', currencies: currencies });
    }).catch((error) => {
        resApp.render('index', { title: 'Currency Converter App', error: error, currencies: [] });
    });

});


module.exports = router;