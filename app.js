// server.js
'use strict'

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const Promise    = require('bluebird');
const request    = Promise.promisify(require('request'));
const api_key    = process.env.ETSY_KEY;
const etsyUrl = 'https://openapi.etsy.com/v2/shops/carlagabrielgarcia/listings/active.js?&includes=Images:1&api_key=' + api_key;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/etsy', function(req, res) {
    request(etsyUrl)
      .then(function (response) {
        res.send(response.body);
      });
});

app.use('/', router);

app.listen(port);
console.log('Server running on port ' + port);