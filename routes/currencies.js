var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, appResponse, next) {
    let baseUrl = 'https://free.currencyconverterapi.com/api/v5/';

    function getCurrency() {
        let url = baseUrl + 'currencies';
        let jsonObj;

        https.get(url, function(res) {
            let body = '';

            res.on('data', function(chunk){
                body += chunk;
                console.log(body);
            });

            res.on('end', function(){
                try {
                    jsonObj = JSON.parse(body);
                    console.log(jsonObj);
                    appResponse.send(jsonObj);
                } catch(e) {
                    console.log("Parse error: ", e);
                    appResponse.send(e.message);
                }
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
            appResponse.send(e.message);
        }).on('success', function(response) {
            console.log(response);
        });
    }


getCurrency();
});

module.exports = router;