const functions = require('firebase-functions');
const admin = require('../config.js').admin;




exports.updateCRM = functions.database.ref('/profiles/{userId}/contact/email').onWrite(event => {

     //only go father if data changed
      if(!event.data.changed()){
          return
      }

    var userId = event.params.userId
    var email = event.data.val().toLowerCase()
   var  key = email.replace(/[/[\]'.@]/g, "");//because firebase does not like . and @ in keys
   var data ={email:email,
             contact_id: userId}

return  admin.database().ref('email_user_index/'+key).set(data)
          

})