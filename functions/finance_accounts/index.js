const functions = require('firebase-functions');
const admin = require('../config.js').admin;



exports.processIncome = functions.database.ref('/finance_accounts/{accountId}/income_transactions/{transactionId}').onWrite(event => {

   // Only edit data when it is first created.
      if (event.data.previous.exists()) {
        return;
      }
      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }

    var p = []
    var tran = event.data.val()
    var updates ={}
   
          var text = tran.item_number || tran.memo 
        //  console.log( 'text:' +text)
          var is_donation =  text.match(/D-/i)  //https://regex101.com/r/LMhrup/1
              
              if(is_donation){
               // console.log('system thinks this is a donation')
                updates.donation = true
               
              }


        //if contact has not yet been matched
        if(!tran.firebase_user_id){
            
            //try email 
            if(tran.payer_meta.email){
             // console.log('looking for email '+tran.payer_meta.email)
               
                p[p.length] =  new Promise(function(resolve, reject) {
                
                //if this transaction has a paypal ID look it up
                if(tran.payer_meta.paypal_id){
                admin.database().ref('/crm/').orderByChild('paypal_id')
                .equalTo(tran.payer_meta.paypal_id)
                .once('value').then(snap => {

                  snap.forEach(function(child){
                   
                     updates.firebase_user_id = child.key
                  })
                  if(updates.firebase_user_id){
                   resolve()
                   }else{operationFindEmail()}
                })
              }else{ //end if paypal ID
                operationFindEmail()
              }
              
               
               
               function operationFindEmail(){ 
               
                  admin.database().ref('/profiles/').orderByChild('contact/email')
                .equalTo(tran.payer_meta.email)
                .once('value').then(snap => {

                  snap.forEach(function(child){
                    // console.log(child.val().contact)
                     updates.firebase_user_id = child.key
                    //  updates.firebase_user_name = child.val().contact.first_name +' '+child.val().contact.last_name
                  })
                   resolve()
                    
                    })
                 
                 
                 
                  
                    
                    }



               
                    
                  })//end promise
                  }
            
           

        }


        //Try to find the fund
       p[p.length] =  new Promise(function(resolve, reject) {
        admin.database().ref('/funds/').once('value').then(snap => {

        snap.forEach(function(child){
            // console.log(snap.key)
            if(text.toLowerCase().indexOf(child.key)>-1){
              console.log('this is a fund match to '+child.key)
                 updates.fund_id = child.key
                
            }
            //do a check for the last fund.. and then resolve()
          })
           resolve()
        })
      })//end promise


    return Promise.all(p).then(function(){
      // console.log(p)
      console.log(updates)
      return event.data.adminRef.update(updates) 
    })

})