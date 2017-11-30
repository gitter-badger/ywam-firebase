var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

exports = module.exports =  functions.database.ref('/finance_accounts/{accountId}/expense_transactions/{transactionId}').onWrite(event => {
  
      var tran = event.data.val()
  
     // Only edit data when it is first created.
        if (event.data.previous.exists() && !tran.reprocess ) {
          return 
        }
        // Exit when the data is deleted.
        if (!event.data.exists()) {
          return;
        }
  
      var p = []
      var updates ={}
      var text = tran.item_number || tran.memo || ''
  
  
  
        //   //Try to find the fund
        //  p[p.length] =  new Promise(function(resolve, reject) {
        //   admin.database().ref('/funds/').once('value').then(snap => {
  
        //   snap.forEach(function(child){
        //       // console.log(snap.key)
        //       if(text.toLowerCase().indexOf(child.key)>-1){
        //         console.log('this is a fund match to '+child.key)
        //            updates.fund_id = child.key
                  
        //       }
        //       //do a check for the last fund.. and then resolve()
        //     })
        //      resolve()
        //   })
        // })//end promise
  
         //Check if this transaction should have the hidden flag set
         p[p.length] =  new Promise(function(resolve, reject) {
          // console.log('account id is '+event.params.accountId)
          admin.database().ref('/finance_accounts/'+event.params.accountId+ '/settings/hide_keywords_expense').once('value').then(snap => {
         // console.log(snap.val())
          snap.forEach(function(child){
           //   console.log(child.val())
              if( text.includes(child.val()) ){
              //  console.log('setting ignore flag for '+child.val())
                   updates.hidden = true
                  
              }
             
            })
             resolve()
          })
        })//end promise
  
  
  
      return Promise.all(p).then(function(){
        // console.log(p)
        updates.reprocess=null
        console.log(updates)
        return event.data.adminRef.update(updates) 
      })
  
  })
  