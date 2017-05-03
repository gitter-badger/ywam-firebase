var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
// const cors = require('cors')({origin: true});



exports.ipn = functions.https.onRequest((req, res) => {


  console.log('Body: ',req.body)
  var p = []

  var txn_id = req.body.txn_id;
//   if( ['web_accept', 'subscr_payment', 'send_money'].indexOf(req.body.txn_type) >= 0  ){
      
        if(txn_id)
       p[p.length]  = admin.database().ref('paypal_payments').child(txn_id).update(req.body)

        if(req.body.subscr_id && req.body.item_number){
            var subscr = {payer_id : req.body.payer_id,
                          payer_email: req.body.email,
                          designation_code: req.body.item_number,
                         body: req.body }

         p[p.length] =  admin.database().ref('designation_subscriptions').child(req.body.subscr_id).update(subscr)                
        }


//   }else{

//      admin.database().ref('paypal_other').push(req.body)
//   } 

p[p.length] = res.status(200).send('Thanks for the update');

return Promise.all(p)
})

