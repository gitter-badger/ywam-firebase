var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.database.ref('/profiles/{userId}/postal').onWrite(event => {

     //only go father if data changed
      if(!event.data.changed()){
          return
      }

    var userId = event.params.userId

   var data ={postal_address_update: new Date().getTime(),
             
            }

return  admin.database().ref('crm/'+userId+'/last').update(data)
          

})