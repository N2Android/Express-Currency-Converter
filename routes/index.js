var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, resApp, next) {

    let baseUrl = 'https://free.currencyconverterapi.com/api/v5/';

    function getCurrencies() {
        let url = baseUrl + 'currencies';

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
                    console.log('Response: ');
                    console.log(currenciesResponseJson);
                    console.log('Results - start');
                    let results = currenciesResponseJson.results;
                    console.log(results);
                    console.log('Results - end');
                    return Object.keys(results);
                } catch (e) {
                    console.log("Parse error: ", e);
                }
            });
        }).on('error', function(e) {
            console.log("Got an error: ", e);
        });
    }

    let currencyKeys = getCurrencies();
    resApp.render('index', { title: 'Currency Converter App', currencies: currencyKeys });
});


module.exports = router;