var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

const notification = require('../../notification').notification;

exports = module.exports =  functions.database.ref('/applications/{appId}/meta/status')
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
