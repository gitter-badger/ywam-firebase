var functions = require('firebase-functions');
const admin = require('../config.js').admin;
var plaid = require('plaid');



exports.get_access_token = functions.database.ref('/location_private/bank/public_token')
    .onWrite(event => {

       const fund_id  = event.params.fundId
       const promises = [];

    })