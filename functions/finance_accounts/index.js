const functions = require('firebase-functions');
const admin = require('../config.js').admin;
var moment = require('moment');
const notification = require('../notification').notification;

exports.processIncome = functions.database.ref('/finance_accounts/{accountId}/income_transactions/{transactionId}').onWrite(event => {

    var tran = event.data.val()

   // Only edit data when it is first created.
      if (event.data.previous.exists() && !tran.reprocess ) {
        return processTransactionPart2(event)
      }
      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }

    var p = []
    
    var updates ={}
   
          var text = tran.item_number || tran.memo || ''
      
          var is_donation =  text.match(/D-/i)  //https://regex101.com/r/LMhrup/1
              if(is_donation){
                updates.donation = true
               }

            var is_payment =  text.match(/P-/i) 
              if(is_payment){
                updates.payment = true
               }    

   if(tran.payer_meta){
          p[p.length] =  new Promise(function(resolve, reject) {
                
                //if this transaction has a paypal ID look it up
                if(tran.payer_meta.paypal_id){
                admin.database().ref('/crm/').orderByChild('paypal_id')
                .equalTo(tran.payer_meta.paypal_id)
                .once('value').then(snap => {

                  snap.forEach(function(child){
                   
                     updates.contact_id = child.key
                  })
                  if(updates.contact_id){
                   resolve()
                   }else{operationFindEmail()}
                })
              }else{ //end if paypal ID
                operationFindEmail()
              }
              
               
               
               function operationFindEmail(){ 
               var email = tran.payer_meta.email.toLowerCase()
                  admin.database().ref('/email_user_index/').orderByChild('email')
                .equalTo(email)
                .once('value').then(snap => {
                  if(snap.val()){
                  snap.forEach(function(child){
                    // console.log(child.val().contact)
                     updates.contact_id = child.val().contact_id
                    //  updates.contact_name = child.val().contact.first_name +' '+child.val().contact.last_name
                  })
                   resolve()
                  }else{
                    console.log('Email not found in index.. adding it now: '+ email)
                     
                     var crmdata = { name: {first_name: tran.payer_meta.first_name,
                                            last_name: tran.payer_meta.last_name},
                                    email: email,
                                    paypal_id: tran.payer_meta.paypal_id,
                                    residence_country : tran.payer_meta.residence_country } 

                     admin.database().ref('/crm/').push(crmdata).then(function(newsnap){

                      console.log('new snap key: '+newsnap.key)

                        var key =  email.replace(/[/[\]'.@]/g, "")
                        var data = {email:email,
                                   contact_id: newsnap.key
                           }
                           updates.contact_id = newsnap.key
                          

                     admin.database().ref('/email_user_index/'+key).update(data).then(function(){

                       resolve()
                     })//end update of 
                     })//end new crm entry
                     }//end if email was not found
                     })//end find 
                     }//end function find email 
                    
                  })//end promise
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
      updates.reprocess=null
      console.log(updates)
      return event.data.adminRef.update(updates) 
    })

})



 function processTransactionPart2(event) {

      var transaction = event.data.val()

      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }

      // Exit when there is no firebase_user
      if (!transaction.contact_id) {
        return;
      }
 
     
      
      var account_id = event.params.accountId;
      var transaction_id = event.params.transactionId;

      var p = []
      var fund ={}
      var crm ={}
      
      //console.log('processing transaction updates '+transaction_id)
       
      
      if(transaction.fund_id){
        console.log('fund: '+transaction.fund_id + 'Transactions: '+transaction_id)

       //find out if fund is a ministry or staff_support
        p[p.length] =  admin.database().ref('/funds/'+transaction.fund_id).once('value').then(function(snap){
            fund  = snap.val()
            //get the previous last values so that we don't put an older date over top of a newer one
            return   admin.database().ref('/crm/'+transaction.contact_id).once('value').then(function(crmSnap){
                          crm =  crmSnap.val()//used in the sending of notifications.. down below in the then
                        var current_last = crmSnap.val().last

                        var updates ={}
                        
                        //  console.log(current_last)
                        //  console.log(fund.meta)
                        //  console.log(transaction)
                        if(transaction.donation && fund.meta.type =='ministry' && ( !current_last || !current_last.ministry_support || current_last.ministry_support < transaction.date))
                            updates.ministry_support = transaction.date

                          if(transaction.donation && fund.meta.type == 'staff support' && ( !current_last ||  !current_last.staff_support || current_last.staff_support < transaction.date))
                            updates.staff_support = transaction.date   

                          if(transaction.payment && ( !current_last || !current_last.payment || current_last.payment < transaction.date ) )
                            updates.payment = transaction.date    

                      return admin.database().ref('/crm/'+transaction.contact_id+'/last').update(updates)

            })//end get last crm data

         })//end get fund info
       
        //now add or remove if it is a donation to the donnors transaction list
         var year = moment().format('YYYY')  
        if(transaction.donation){

           p[p.length] = admin.database().ref('/donors/'+transaction.contact_id+'/years/'+year+'/funds/'+transaction.fund_id).set(transaction.date)


         var updates ={}
             updates = {   fund_id:transaction.fund_id,
                            date: transaction.date,
                            amount: transaction.gross, 
                            method: transaction.method || null
                                            }                                   

          p[p.length] = admin.database().ref('/donors/'+transaction.contact_id+'/years/'+year+'/transactions/'+transaction_id).update(updates)
        }else { //transaction was is not a donation make sure it is not in the list of donations for the donner
          p[p.length] = admin.database().ref('/donors/'+transaction.contact_id+'/years/'+year+'/transactions/'+transaction_id).remove()

        }

       



      }//end if fund_id


      return Promise.all(p).then(function(){
      //  var data ={fund:fund,
      //             transaction:transaction,
      //             crm:crm}
      //  return admin.database().ref('console').push(data)
       return sendFundNotifications(fund, transaction, crm,event)
      
      })
}


function sendFundNotifications(fund, transaction, crm,event){

    var p = []
      //Now send out notifications of transaction if it has not been already 
        if(!transaction.notifications_sent && fund && fund.transaction_notifications && crm && transaction.donation ){
          console.log('looks like notifications have not been sent sending now')

         // console.log(fund.transaction_notifications.anonymous)
          //console.log(fund.transaction_notifications.private)

          if(fund.transaction_notifications.anonymous){
            var message = 'A donation of $'+transaction.gross +' came in for the '+transaction.fund_id +' fund! :tada:'
          p[p.length] =  notification(message,null ,fund.transaction_notifications.anonymous )
          }

          if(fund.transaction_notifications.private){
           p[p.length] = admin.database().ref('/location_public/meta/').once('value').then(function(snap){
            var url = snap.val().apply_url +'/profile/'+transaction.contact_id

            var message = 'A donation from <'+url+'|'+ crm.name.first_name +' '+ crm.name.last_name+' > of $'+transaction.gross +' came in for the '+transaction.fund_id +' fund! :tada:'
          p[p.length] =  notification(message,null ,fund.transaction_notifications.private )
           })//end get url
        }

           p[p.length] = event.data.adminRef.child('notifications_sent').set(true) 
        } 
        return Promise.all(p)
}