const functions = require('firebase-functions');
const admin = require('../config.js').admin;
var moment = require('moment');


exports.processIncome = functions.database.ref('/finance_accounts/{accountId}/income_transactions/{transactionId}').onWrite(event => {


   // Only edit data when it is first created.
      if (event.data.previous.exists()) {
        return processTransactionContactLink(event)
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



 function processTransactionContactLink(event) {

      var transaction = event.data.val()

      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }

      // Exit when there is no firebase_user
      if (!transaction.firebase_user_id) {
        return;
      }
 
     
      
      var account_id = event.params.accountId;
      var transaction_id = event.params.transactionId;

      var p = []
      
      console.log('processing transaction updates '+transaction_id)
       
      
      if(transaction.fund_id){
        console.log('processing fund updates '+transaction.fund_id)

       //find out if fund is a ministry or staff_support
        p[p.length] =  admin.database().ref('/funds/'+transaction.fund_id+'/meta/').once('value').then(function(snap){
          
          var fund_meta = snap.val()
           var updates ={}
           
           console.log(fund_meta)
           console.log(transaction)
           if(transaction.donation && fund_meta.type =='ministry')
              updates.ministry_support = transaction.date

            if(transaction.donation && fund_meta.type=='staff_support')
              updates.staff_support = transaction.date   

            if(transaction.payment )
              updates.payment = transaction.date    

         return admin.database().ref('/crm/'+transaction.firebase_user_id+'/last').update(updates)

        })
       
        //now add or remove if it is a donation to the donnors transaction list
         var year = moment().format('YYYY')  
        if(transaction.donation){
         var updates ={}
             updates[transaction_id] = {fund_id:transaction.fund_id,
                                             date: transaction.date,
                                             amount: transaction.gross, 
                                             method: transaction.method || null
                                            }                                   

          p[p.length] = admin.database().ref('/donors/'+transaction.firebase_user_id+'/years/'+year+'/transactions/').update(updates)
        }else { //transaction was is not a donation make sure it is not in the list of donations for the donner
          p[p.length] = admin.database().ref('/donors/'+transaction.firebase_user_id+'/years/'+year+'/transactions/'+transaction_id).remove()

        }
      }


      return Promise.all(p)
}