var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});

var braintree = require("braintree");


exports.client_token = functions.https.onRequest((req, res) => {
cors(req, res, () => {
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId:  functions.config().braintree.merchant_id,
  publicKey:   functions.config().braintree.public_key,
  privateKey:  functions.config().braintree.private_key
});

gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });

})

})