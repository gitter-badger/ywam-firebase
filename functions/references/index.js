var functions = require('firebase-functions');
const admin = require('../config.js').admin;
 var nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const gcs = require('@google-cloud/storage')();


exports.sendEmail = functions.database.ref('/applications/{appId}/{refKey}/user_set/send_requested')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
    
        if(original == true){


            console.log('refernece requested to be sent!', event.params.appId, event.params.refKey);
               return admin.database().ref('/applications/'+event.params.appId+'/'+event.params.refKey).once('value').then(function(snap){
                     var data={appId:event.params.appId,
                              refId:event.params.refKey,
                              refData:snap.val(),
                             }
                     
                  return admin.database().ref('/applications/'+event.params.appId+'/for').once('value').then(function(snap){
                      data.appData=snap.val()  ;
                    return  admin.database().ref('/profiles/'+data.appData.user_id+'/com').once('value').then(function(snap){
                            data.userData=snap.val();
                            
                            return  emailStep1(data);
                           
                        // console.log('found default bucket:' , functions.config().firebase.storageBucket)  
                        //  var file = gcs.bucket(functions.config().firebase.storageBucket).file(data.userData.avatar_200)
                        //  return   file.getMetadata().then(function(metadata) {
                        //             console.log(metadata)
                        //            data.userData.avatar_url = metadata[0].selfLink;
                        //           return  emailStep1(data);
                        //         });

                        

                    
                      })//end get user data
                      
                  })   //end get applicaton
                    
                   
                 });//end get reference
            
        }
        else
        {
            return;
        }
      


    });
//Get school if school and  location data
function emailStep1(data){
    console.log('email step 1!')
    //create token 
    var refRef = '/applications/'+data.appId+'/'+data.refId

return admin.database().ref('/reference_tokens/').push({ref:refRef,created: new Date().getTime()}).then(function(snap){

    data.hash = snap.key
    //  console.log(data);
    if(data.appData.school_id){
       
       return admin.database().ref('/schools/'+data.appData.school_id+'/public/').once('value').then(function(snap){
            data.school=snap.val()
           return admin.database().ref('/locations_public/'+data.school.location_id+'/meta/').once('value').then(function(snap){
             data.location=snap.val()
               data.location.id=data.school.location_id;
          
           return emailStep2(data);
           
        })
        })
       }
    else{
        return emailStep2(data);
    }
    
})


}

// Compose the HTML in the language
function emailStep2(data){
     console.log('email step 2!')
     data.html= `no language set`  
     data.url=data.location.apply_url+"/referenceForm/"+data.hash
     
     
    if(data.refData.user_set.language=="en"){
        var schoolDate="";
        if(data.school){
        var date=new Date(data.school.start_date);
        schoolDate=data.school.name+" "+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
        var appFor="a school"
        }
        if(data.appData.type==1){
            var appFor="Staff";
        }
        else if(data.appData.type==2)
            {
                 var appFor="Missionbuilder";
            }
        
     data.html=`Dear ${data.refData.user_set.name},<br> `+
         `We are sending you this email because ${data.userData.first_name} ${data.userData.last_name} has applied for ${appFor} at Youth with a Mission ${data.location.name}. `+
         `<p>School:<br>${schoolDate}</p>`+
         `To better understand ${data.userData.first_name}'s application, we ask that you complete our online reference form. <br>Please click the link below to continue: <br>`+
        `<a href="${data.url}">${data.url}</a>`
     
     
    }
   return emailStep3(data);
}


function emailStep3(data){
     console.log('email step 3!')
    //get mailgun auth details
   return admin.database().ref('/locations_private/'+data.location.id).once('value').then(function(snap){
       
         var auth = { auth: snap.val().mailgun }
        var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    
        
      return nodemailerMailgun.sendMail({
           from: 'info@ywamsarasota.com',
           to: data.refData.user_set.email, // An array if you have multiple recipients.
           //cc:'second@domain.com',
           //bcc:'secretagent@company.gov',
           subject: 'Hey you, awesome!',
           //'h:Reply-To': 'reply2this@company.com',
           //You can use "html:" to send HTML email content. It's magic!
           html: data.html,
           //You can use "text:" to send plain-text content. It's oldschool!
           'v:statusRef' : '/applications/'+data.appId+'/'+data.refId+'/status/email',
           text: 'Mailgun rocks, pow pow!'
         }, function (err, info) {
           if (err) {
             console.log('Error: ' + err);
               return admin.database().ref('/applications/'+data.appId+'/'+data.refId).child('mailgun').set(err)
           }
           else {
             console.log('Response: ' , info);
             var updates = { mailgun: info,
                            'user_set/sent': true,
                            'user_set/send_requested': false,
                            url: data.url,
                            hash: data.hash,
                            meta: {applicant_first_name: data.userData.first_name,
                                                       applicant_last_name: data.userData.last_name,
                                                       applicant_gender: data.userData.gender,
                                                       applicant_avatar: data.userData.avatar_200,
                                                      for: data.appData,
                                                      reference_name: data.refData.user_set.name,
                                                      language: data.refData.user_set.language,
                                                      },
                            }

             return admin.database().ref('/applications/'+data.appId+'/'+data.refId).update(updates) 
             
         
             
           }
         });

})
    
}
                                                                    
                                                                    
                                                                    
                                                                    
                                                                    
                                                                    
                                                                    