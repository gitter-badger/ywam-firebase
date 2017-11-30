var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

const notification = require('../../notification').notification;

exports = module.exports =functions.database.ref('/applications/{appId}/requests/submit')
.onWrite(event => {
  // Grab the current value of what was written to the Realtime Database.
   const submit = event.data.val();
   if(submit){
       var p=[]
      var data ={ status: 10,
                  statuses:{ 10: {time:  new Date().getTime()} }}
                            
          p[p.length] = admin.database().ref('/applications/'+event.params.appId+'/meta').set(data)

          p[p.length] = admin.database().ref('/applications/'+event.params.appId+'/for').once('value').then(function(snap){
                         var appfor = snap.val();  
                         return admin.database().ref('/profiles/'+appfor.user_id+'/contact/').once('value').then(function(snap){
                                var contact = snap.val()
                                var message = appfor.type+' Application Submited! by: '
                                    if(contact)
                                       message +=  contact.first_name+' '+contact.last_name;
                                       return notification(message, appfor.type+'_application_submited' )
                          });
                                        
                   });
                                   
          

   return Promise.all(p)         

   }else{
       return
   }


})