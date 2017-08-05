const functions = require('firebase-functions');
const admin = require('../config.js').admin;
var moment = require('moment');


exports.merge = functions.database.ref('/crm/{contactId}/merge_to_contact_id').onWrite(event => {

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

exports.updateProfileName = functions.database.ref('/crm/{contactId}/name').onWrite(event => {

      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }
      //only go father if data changed
      if(!event.data.changed()){
          return
      }

    var updates = { first_name: event.data.val().first_name,
                    last_name: event.data.val().last_name }

    return  admin.database().ref('/profiles/'+event.params.contactId+'/contact').update(updates).then(function(){
          console.log('updated user profile name from CRM record change')
        
      })              

})