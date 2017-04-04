var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const nodemailer= require('nodemailer');
const mg=require('nodemailer-mailgun-transport');


exports.sendEmail = functions.database.ref('/applications/{appId}/{refKey}/user_set/send_requested')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
    
        if(original){
            console.log('refernece requested to be sent!', event.params.appId, event.params.refKey);
               return admin.database().ref('/applications/'+event.params.appId+'/'+event.params.refKey).on('value',function(snap){
                     var data={appId:event.params.appId,
                              refId:event.params.refKey,
                              refData:snap.val()}
                     
                  return admin.database().ref('/applications/'+event.params.appId+'/for').on('value',function(snap){
                      data.appData=snap.val()  ;
                    return  admin.database().ref('/profiles/'+data.appData.user_id+'/com').on('value',function(snap){
                          data.userData=snap.val();
                     return  emailStep1(data);
                      })
                      
                  })   //end get applicaton
                    
                   
                 });//end get reference
            
         /* return  admin.database().ref('/applications/'+event.params.appId+'/'+event.params.refKey+'/user_set/send_requested').set(false);
         admin.database().ref('/applications/'+event.params.appId+'/'+event.params.refKey+'/user_set/sent').set(true);*/
        }
        else
        {
            return;
        }
      


    });

function emailStep1(data){
     console.log(data);
    if(data.appData.school_id){
       
       return admin.database().ref('/schools/'+data.appData.school_id+'/public/').on( 'value',function(snap){
            data.school=snap.val()
           return admin.database().ref('/locations_public/'+data.school.location_id+'/meta/').on('value',function(snap){
             data.location=snap.val()
               data.location.id=data.school.location_id;
          
           return emailStep2(data);
           
        })
        })
       }
    else{
        return emailStep2(data);
    }
    
    
}

function emailStep2(data){
     data.html= `no language set`  
     var url=data.location.apply_url+"/referenceForm/"+data.appId+"/"+data.refId
     
     
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
        `<a href="${url}">${url}</a>`
     
     
    }
   return emailStep3(data);
}
function emailStep3(data){
    //get mailgun auth details
admin.database().ref('locations_private/'+ data.location.id ).child('mailgun')
 .once('value',function(snap){
   //if(debug) console.log('got location mailgun info...')
   
   var auth = { auth: snap.val() }
   var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    
   return admin.database().ref('/locations_private/'+data.location.id).on( 'value',function(snap){
        var mailgun=snap.val()
        
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
           text: 'Mailgun rocks, pow pow!'
         }, function (err, info) {
           if (err) {
             console.log('Error: ' + err);
           }
           else {
             console.log('Response: ' , info);
              //refRef.child('mailgun').set( info);
             return 
             
           }
         });





         /*refRef.child('status/current/sent').set(true)
         refRef.child('status/sent').set( new Date().getTime() );
         refRef.child('user/sent').set( true );
         refRef.child('user/send_requested').set( false);
         refRef.child('processing').set( false);
         refRef.child('hash').set( hash );*/
        
    })
})
    
}
                                                                    
                                                                    
                                                                    
                                                                    
                                                                    
                                                                    
                                                                    