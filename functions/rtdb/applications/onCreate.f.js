var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

const notification = require('../../notification').notification;

exports = module.exports = functions.database.ref('/applications/{appId}/for/user_id')
    .onCreate(event => {
      // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
   
      // Exit when the data is deleted.
      if (!event.data.exists()) {
          console.log('data is being deleted.. removing from indexes')
          var user_id = event.data.previous.val()
          var app_id = event.params.appId
          var p = []
          //This is not the best way, as cleaning up of a school application of a current staff will remove that userid from staff indexes
          // p[p.length] = admin.database().ref('location' ).child('alumni_staff_index').child(user_id).remove()
          // p[p.length] = admin.database().ref('location' ).child('current_staff_index').child(user_id).remove()
          // p[p.length] = admin.database().ref('location' ).child('staff_app_index').child(user_id).remove()
           p[p.length] = admin.database().ref('/profiles/'+user_id+'/app_index/'+app_id).remove()

        return Promise.all(p)
      }

       // Only edit data when it is first created.
      if (event.data.previous.exists()) {
          console.log('nothing new')
        return;
      }

     return   admin.database().ref('/applications/'+event.params.appId+'/meta').on('value',function(snap){
                        if(snap.val() ){
                            console.log('// already has meta start values')
                            return // already has meta start values
                        }
                        
                        else {
                                console.log('adding start time', event.params.appId, original);
                            // add created timestamp & status of 1
                            var data ={ status: 1,
                                        statuses:{ 1: {time:  new Date().getTime()} }}

                            var appRef =  admin.database().ref('/applications/'+event.params.appId)

                                return  appRef.child('meta').set(data).then(function(){
                                        return appRef.child('/for').once('value').then(function(snap){
                                                  
                                            var appfor = snap.val()

                                            return admin.database().ref('/profiles/'+appfor.user_id+'/contact/').once('value').then(function(snap){
                                                 var contact = snap.val()
                                                
                                                 return admin.database().ref('/location_public/meta/').once('value').then(function(snap){
                                                    var url = snap.val().apply_url
                                                
                                                var text = ''
                                                
                                                 switch(appfor.type) {
                                                        case 'school':
                                                            text += 'School'
                                                            url += '/school/'+appfor.school_id
                                                            break;
                                                        case 'staff':
                                                            text += 'Staff'
                                                            url += '/staff'
                                                            break;
                                                        
                                                    }
                                                    url += '/application/'+event.params.appId +'/'
                                               
                                                  var message = '<'+ url +'|'+text+' Application Started! > '

                                                 if(contact)
                                                  message += 'by:'+  contact.first_name+' '+contact.last_name;

                                                 return notification(message, appfor.type+'_application_started')
                                            })

                                             })
                                            
                                        })
                                       
                                    }) ;
                        }

                    })
           
});



