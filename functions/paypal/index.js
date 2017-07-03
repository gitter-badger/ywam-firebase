var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
// const cors = require('cors')({origin: true});



exports.ipn = functions.https.onRequest((req, res) => {


  console.log('Body: ',req.body)
  var p = []
  var processed = false
  var data = req.body    

        if(data.payment_date)
      data.payment_date = new Date(data.payment_date).getTime()

      if(data.txn_id){//If this is an update on a transaciton
          // p[p.length]  = admin.database().ref('paypal_payments').child(data.txn_id).update(data)
        
          var transaciton = {
            date:data.payment_date, 
            method:'paypal',
            status: data.payment_status.toLowerCase(),
            type: data.payment_type?data.payment_type:null,
            status_reason : data.pending_reason? data.pending_reason:null,
            fee: data.mc_fee?data.mc_fee:null , 
            gross: data.mc_gross,
            memo: data.memo ?data.memo :null,
            item_number: data.item_number ? data.item_number : null,
            payer_meta: {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.payer_email,
              paypal_id:data.payer_id,
              residence_country : data.residence_country
            },
            original: data
          }
           p[p.length]  = admin.database().ref('finance_accounts/paypal_'+data.receiver_id+'/income_transactions').child(data.txn_id).update(transaciton)
          
          
          
          processed = true



      }
     

        if(data.subscr_id && data.item_number){
            var subscr = {payer_id : data.payer_id,
                          payer_email: data.payer_email,
                          fund_id: data.item_number,
                          gross: data.mc_gross ||'',
                          fee: data.mc_fee? data.mc_fee:'',
                          memo: data.transaction_subject || '',
                          service: 'paypal',
                          body: data }

         p[p.length] =  admin.database().ref('fund_subscriptions').child(data.subscr_id).update(subscr)
          processed = true                
        }


    if(processed == false)//if none of the things above handled this event then log it to events
       p[p.length] = admin.database().ref('paypal_events').push(data)


p[p.length] = res.status(200).send('Thanks for the update');

return Promise.all(p)
})

