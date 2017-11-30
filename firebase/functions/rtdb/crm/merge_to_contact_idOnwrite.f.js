var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');


exports = module.exports = functions.database.ref('/crm/{contactId}/merge_to_contact_id').onWrite(event => {

      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }

    var to_id = event.data.val()
    var updates = {}

     return   event.data.ref.parent.once('value',function(snap){

        console.log('merging'+event.params.contactId +' to '+ to_id )
            updates = snap.val()
      
    
  
 

  return  admin.database().ref('crm').child(to_id).update(updates).then(function(){

           var key =  updates.email.replace(/[/[\]'.@]/g, "")
                        var data = {//email:email,
                                   contact_id: to_id
                           }
                           console.log('now updating email_user_index to point to the right crm')
             return   admin.database().ref('/email_user_index/'+key).update(data).then(function(){  
                    console.log('now removing old crm entry')
                return event.data.ref.parent.remove()
             })
  })
     })
})
