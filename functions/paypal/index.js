var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
// const cors = require('cors')({origin: true});



exports.ipn = functions.https.onRequest((req, res) => {


  console.log('Body: ',req.body)
  var p = []
  var data = req.body      
      data.payment_date = new Date(data.payment_date).getTime()

      if(data.txn_id)
       p[p.length]  = admin.database().ref('paypal_payments').child(data.txn_id).update(data)

        if(data.subscr_id && data.item_number){
            var subscr = {payer_id : data.payer_id,
                          payer_email: data.payer_email,
                          designation_code: data.item_number,
                          amount: data.mc_amount3,
                          fee: data.mc_fee? data.mc_fee:'',
                          body: data }

         p[p.length] =  admin.database().ref('designation_subscriptions').child(data.subscr_id).update(subscr)                
        }


//   }else{

//      admin.database().ref('paypal_other').push(data)
//   } 

p[p.length] = res.status(200).send('Thanks for the update');

return Promise.all(p)
})

