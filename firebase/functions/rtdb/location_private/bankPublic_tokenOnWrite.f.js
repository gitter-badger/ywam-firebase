var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
var moment = require('moment');
var plaid = require('plaid');

exports = module.exports =   functions.database.ref('/location_private/bank/public_token')
.onWrite(event => {

var public_token = event.data.val()
return admin.database().ref('/location_private/plaid').once('value').then(function(snap){


   var client = new plaid.Client(
        snap.val().client_id,
        snap.val().secret,
        snap.val().public_key,
       plaid.environments['development']
        );


          client.exchangePublicToken(public_token, function(error, tokenResponse) {
            if (error != null) {
            var msg = 'Could not exchange public_token!';
            console.log(msg + '\n' + error);
            return 
           }
           var data = {access_token: tokenResponse.access_token,
                       item_id: tokenResponse.item_id}

            
            admin.database().ref('/location_private/bank').update(data)    

        });

    })
    


})



