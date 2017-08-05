var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const notification = require('../notification').notification;

exports.onCreate = functions.database.ref('/applications/{appId}/for/user_id')
    .onWrite(event => {
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





exports.updateIndexes = functions.database.ref('/applications/{appId}/meta/status')
    .onWrite(event => {
    
    
      // Grab the current value of what was written to the Realtime Database.
       const status = event.data.val();
       const app_id  = event.params.appId
       const promises = [];
   

   return   admin.database().ref('applications/'+app_id+'/for' ).on('value',function(snap){
                
                var appfor = snap.val();
              
                var user_id = appfor.user_id
                var data = {status: status,
                            for: appfor }
                console.log('updating app indexes', app_id, status);

             if(appfor.type =='staff'){
               
                
                // //All staff Ever index
                promises.push(admin.database().ref('location').child('staff_app_index').child(app_id).set(status));
                //current_staff_index
                if(status == 30 || status == '30'){
                    promises.push(admin.database().ref('location' ).child('current_staff_index').child(user_id).set(true));
                }else{
                    console.log('removing from current staff list')
                    promises.push(admin.database().ref('location' ).child('current_staff_index').child(user_id).remove());
                }
                //alumni_staff_index
                if(status == 70 || status == '70'){
                    console.log('Seting as Alumni')
                    promises.push(admin.database().ref('location' ).child('alumni_staff_index').child(user_id).set(true));
                }else{
                    promises.push(admin.database().ref('location' ).child('alumni_staff_index').child(user_id).remove());
                }
            
            }//end if a staff app
            
            if(appfor.school_id){
               promises.push(admin.database().ref('schools/'+ appfor.school_id ).child('app_index').child(app_id).set(status));
            }
    
             promises.push(admin.database().ref('/profiles/'+user_id+'/app_index/'+app_id).set(data))
              console.log(promises.length + ' promises to resolve')
              return Promise.all(promises);
           
         


       })

    });


exports.submit = functions.database.ref('/applications/{appId}/requests/submit')
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