var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

exports = module.exports =   functions.database.ref('/fund_subscriptions/{subscriptionId}').onWrite(event => {

    var subscr = event.data.val()

   // Only edit data when it is first created.
      if (event.data.previous.exists() && !subscr.reprocess ) {
        return 
      }
      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }

    var p = []
    
    var updates ={}
   
          var text = subscr.item_number || subscr.memo || ''
      
          var is_donation =  text.match(/D-/i)  //https://regex101.com/r/LMhrup/1
              if(is_donation){
                updates.donation = true
               }

            var is_payment =  text.match(/P-/i) 
              if(is_payment){
                updates.payment = true
               }    

   if(subscr.payer_meta){
          p[p.length] =  new Promise(function(resolve, reject) {
                
                //if this subscrsaction has a paypal ID look it up
                if(subscr.payer_meta.paypal_id){
                admin.database().ref('/crm/').orderByChild('paypal_id')
                .equalTo(subscr.payer_meta.paypal_id)
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
               var email = subscr.payer_meta.email.toLowerCase()
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
                     
                    //  var crmdata = { name: {first_name: subscr.payer_meta.first_name,
                    //                         last_name: subscr.payer_meta.last_name},
                    //                 email: email,
                    //                 paypal_id: subscr.payer_meta.paypal_id,
                    //                 residence_country : subscr.payer_meta.residence_country } 

                    //  admin.database().ref('/crm/').push(crmdata).then(function(newsnap){

                    //   console.log('new snap key: '+newsnap.key)

                    //     var key =  email.replace(/[/[\]'.@]/g, "")
                    //     var data = {email:email,
                    //                contact_id: newsnap.key
                    //        }
                    //        updates.contact_id = newsnap.key
                          

                    //  admin.database().ref('/email_user_index/'+key).update(data).then(function(){

                        resolve()
                    //  })//end update of 
                    // })//end new crm entry
                    


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
