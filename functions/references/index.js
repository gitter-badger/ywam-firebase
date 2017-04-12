var functions = require('firebase-functions');
const admin = require('../config.js').admin;

var sendEmail = require('./sendEmail.js')

exports.accessed = functions.database.ref('/applications/{appId}/{refKey}/form/accessed')
    .onWrite(event => {
     
  return   admin.database().ref('/applications/'+event.params.appId +'/'+event.params.refKey +'/status/accessed').set(new Date().getTime());

    })


  exports.submit = functions.database.ref('/applications/{appId}/{refKey}/form/submit')
    .onWrite(event => {
        if(event.data.val()){
     
        return    admin.database().ref('/applications/'+event.params.appId +'/'+event.params.refKey +'/status/recieved').set(new Date().getTime());
        }else{
            return
        }
    })  