const functions = require('firebase-functions');
const admin = require('../config.js').admin;




exports.updateCRM = functions.database.ref('/profiles/{userId}/contact/email').onWrite(event => {

    var userId = event.params.userId
    var email = event.data.val()
   var  key = email.replace(/[/[\]'.@]/g, "");//because firebase does not like . and @ in keys
   var data ={email:email,
             firebase_id: userId}

return  admin.database().ref('crm/'+key).set(data)
          

})