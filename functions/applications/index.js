var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const slack = require('../config.js').slack;

exports.onCreate = functions.database.ref('/applications/{appId}/for/user_id')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    // Only edit data when it is first created.
      if (event.data.previous.exists()) {
          console.log('nothing new')
        return;
      }
      // Exit when the data is deleted.
      if (!event.data.exists()) {
          console.log('data is being deleted ')
        return;
      }

     return   admin.database().ref('/applications/'+event.params.appId+'/meta').on('value',function(snap){
                        if(snap.val() ){
                            console.log('// already has meta start values')
                            return // already has meta start values
                        }
                        
                        else {
                                console.log('adding start date', event.params.appId, original);
                            // add created timestamp & status of 1
                            var data ={ status: 1,
                                            statuses:{ 1: {date:  new Date().getTime()} }}
                                
                                return  admin.database().ref('/applications/'+event.params.appId+'/meta').set(data).then(function(){

                                        return slack('C48NTKRLY','New Application Started! '+ event.params.appId)
                                    }) ;
                        }

                    })
           
});





exports.updateIndexes = functions.database.ref('/applications/{appId}/meta/status')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
       const status = event.data.val();
       const app_id  = event.params.appId
   
   return   admin.database().ref('applications/'+app_id+'/for' ).on('value',function(snap){
                var appfor = snap.val();
                var user_id = appfor.user_id
                var data = {status: status,
                            for: appfor }
                console.log('updating app indexes', app_id, status);

             if(appfor.type ==1){
               
                
                // //All staff Ever index
                admin.database().ref('location' ).child('staff_app_index').child(app_id).set(status);
                //current_staff_index
                if(status == 30){
                    admin.database().ref('location' ).child('current_staff_index').child(user_id).set(true);
                }else{
                    admin.database().ref('location' ).child('current_staff_index').child(user_id).remove();
                }
                //alumni_staff_index
                if(status == 70){
                    admin.database().ref('location' ).child('alumni_staff_index').child(user_id).set(true);
                }else{
                    admin.database().ref('location' ).child('alumni_staff_index').child(user_id).remove();
                }
            
            }//end if a staff app
            
            if(appfor.school_id){
               admin.database().ref('schools/'+ appfor.school_id ).child('app_index').child(app_id).set(status);
            }
    
                return   admin.database().ref('/profiles/'+user_id+'/app_index/'+app_id).set(data)

       })




    
    });


