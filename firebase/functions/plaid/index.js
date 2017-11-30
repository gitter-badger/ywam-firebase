var functions = require('firebase-functions');
const admin = require('../config.js').admin;
var plaid = require('plaid');
var moment = require('moment');





exports.webhook = functions.https.onRequest((req, res) => {


  console.log('Body: ',req.body)
  var p = []
  var processed = false
  var data = req.body   
return admin.database().ref('/location_private/bank/pull_transactions_now').set(true).then(function(){
    return res.status(200).send('Thanks for the update!');
}) 
 

 })