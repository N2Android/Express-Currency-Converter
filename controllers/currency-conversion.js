let express = require('express');
let router = express.Router();
let https = require('https');

router.get('/', function(req, routeRes, next) {
    let baseUrl = 'https://free.currencyconverterapi.com/api/v5/';
    let urlConversionExtension = 'convert?q=';

    function convertCurrency(fromCurrency, amountFromCurrency, toCurrency) {
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        let query = fromCurrency + '_' + toCurrency;

        let url = baseUrl + urlConversionExtension + query;
        //let url = baseUrl + 'convert?q=USD_PHP,PHP_USD&compact=ultra'
        console.log('Conversion url ' + url);

        return new Promise((resolve, reject) => {
            https.get(url, function(res) {
                let body = '';

                res.on('data', function(chunk) {
                    body += chunk;
                    console.log(body);
                });

                res.on('end', function() {
                    try {
                        console.log('response ' + body);
                        let jsonObj = JSON.parse(body);
                        console.log('Parsed Json Object' + jsonObj);
                        console.log('Parsing end!');
                        resolve(jsonObj);
                    } catch (e) {
                        reject('Parsing Error - ', e.message);
                    }
                });
            }).on('error', function(e) {
                reject('Got an error - ', e.message);
            });
        });
    }

    convertCurrency('ZAR', '100', 'USD')
        .then((response) => {
            console.log(response);
            routeRes.send(response);
        }).catch((error) => {
        console.log(error);
        routeRes.send(error);
    });
});

module.exports = router;