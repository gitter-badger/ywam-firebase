var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');


exports = module.exports =  functions.database.ref('/crm/{contactId}/name').onWrite(event => {

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