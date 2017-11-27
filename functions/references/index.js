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

            return admin.database().ref('/applications/'+event.params.appId).once('value').then(function(snap){
                var app = snap.val()
                var refRelation = app[event.params.refKey].form.relation
                var applicantName = app[event.params.refKey].meta.applicant_first_name +' '+ app[event.params.refKey].meta.applicant_last_name

                if(app.for.type=='school'){
                    var message = 'School application reference recieved for '+ applicantName+ ' from their: '+ refRelation+ "." 
                    return notification(message,'school_reference_recieved')
                }
                if(app.for.type=='staff'){
                    var message = 'Staff application reference recieved for '+ applicantName+ ' from their: '+ refRelation+ "."  
                    return notification(message,'staff_reference_recieved')
                }
            })
        });
        }else{
            return
        }
    })  