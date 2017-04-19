var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const notification = require('../notification').notification;

exports.sendEmail = require('./sendEmail.js').sendEmail

exports.accessed = functions.database.ref('/applications/{appId}/{refKey}/form/accessed')
    .onWrite(event => {
     
  return   admin.database().ref('/applications/'+event.params.appId +'/'+event.params.refKey +'/status/accessed').set(new Date().getTime());

    })


  exports.submit = functions.database.ref('/applications/{appId}/{refKey}/form/submit')
    .onWrite(event => {
        if(event.data.val()){
     
        return    admin.database().ref('/applications/'+event.params.appId +'/'+event.params.refKey +'/status/recieved')
        .set(new Date().getTime()).then(function(){
            var message = event.params.refKey+ " Recieved "
            return notification(message,{type:'reference_recieved'})
        });
        }else{
            return
        }
    })  