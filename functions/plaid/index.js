var functions = require('firebase-functions');
const admin = require('../config.js').admin;
var plaid = require('plaid');
var moment = require('moment');



exports.get_access_token = functions.database.ref('/location_private/bank/public_token')
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





exports.pull_transactions = functions.database.ref('/location_private/bank/pull_transactions_now')
    .onWrite(event => {

    if(event.data.val()) {
        var p = []
       
        //get plaid connection info
        return admin.database().ref('/location_private/plaid').once('value').then(function(snap){

                var client = new plaid.Client(
                        snap.val().client_id,
                        snap.val().secret,
                        snap.val().public_key,
                        plaid.environments['development']
                        );

             //get bank info           
            return admin.database().ref('/location_private/bank').once('value').then(function(snap){

                var access_token = snap.val().access_token

                    // Pull transactions for the Item for the last 30 days
                        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
                        var endDate = moment().format('YYYY-MM-DD');
                    return    client.getTransactions(access_token, startDate, endDate, {
                            count: 250,
                            offset: 0,
                        }, function(error, transactionsResponse) {
                            if (error != null) {
                            console.log(JSON.stringify(error));
                            return
                            
                        }
                

                    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
                    // console.log(transactionsResponse);

                    transactionsResponse.transactions.forEach(function(item){

                        //now if this transaction is an update to a pending transaction
                        if(item.pending_transaction_id)
                         var transaction_id = item.pending_transaction_id
                         else
                         var transaction_id = item.transaction_id   
                        // console.log(item)
                        if(item.amount < 0  && !item.pending){//(income is shown as negitive value)

                          var transaciton = {
                            original : item,
                            date:item.date, 
                            // pending: item.pending,
                            // status: data.payment_status.toLowerCase(),
                            type: 'bank',
                            gross: Math.abs(item.amount),
                            memo: item.name || null,
                            // item_number: data.item_number ? data.item_number : null,
                            // payer_meta: {
                            // first_name: data.first_name,
                            // last_name: data.last_name,
                            // email: data.payer_email,
                            // paypal_id:data.payer_id,
                            // residence_country : data.residence_country
                            // }
                        }
                        p[p.length]  = admin.database().ref('finance_accounts/'+item.account_id+'/income_transactions').child(transaction_id).update(transaciton)
                    }

                    if(item.amount > 0 && !item.pending){ //this is an expense
                         var transaciton = {
                              original : item,
                            date:item.date,
                            gross: item.amount,
                            memo: item.name || null,
                           
                        }
                        p[p.length]  = admin.database().ref('finance_accounts/'+item.account_id+'/expense_transactions').child(transaction_id).update(transaciton)
                    

                    }



                })
                
                // console.log(transactionsResponse.accounts)
                
                  transactionsResponse.accounts.forEach(function(item){
                     var balances = item.balances
                         balances.last_update = moment().format('x');
                        p[p.length]  = admin.database().ref('finance_accounts/'+item.account_id+'/balances').update(balances)

                  })



                    return Promise.all(p).then(function(){
                       return admin.database().ref('/location_private/bank/pull_transactions_now').remove() 
                    })

                });

        })
         })
    }

})



exports.webhook = functions.https.onRequest((req, res) => {


  console.log('Body: ',req.body)
  var p = []
  var processed = false
  var data = req.body   
return admin.database().ref('/location_private/bank/pull_transactions_now').set(true).then(function(){
    return res.status(200).send('Thanks for the update!');
}) 
 

 })