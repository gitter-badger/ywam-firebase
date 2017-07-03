var functions = require('firebase-functions');
const admin = require('../config.js').admin;
 var nodemailer = require('nodemailer');
var moment = require('moment');
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
                    return  admin.database().ref('/profiles/'+data.appData.user_id+'/contact').once('value').then(function(snap){
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
      


  
//Get school if school and  location data
function emailStep1(data){
    console.log('email step 1!')
    //create token 
    var refRef = '/applications/'+data.appId+'/'+data.refId

return admin.database().ref('/reference_tokens/').push({ref:refRef,created: new Date().getTime()}).then(function(snap){

    data.hash = snap.key
    //  console.log(data);

 return admin.database().ref('/location_public/meta/').once('value').then(function(snap){
        
        data.location=snap.val()
        //get school info
        if(data.appData.school_id){
       
        return admin.database().ref('/schools/'+data.appData.school_id+'/public/').once('value').then(function(snap){
                data.school=snap.val()
                return emailStep2(data);
        })
       }//end if school
        else{
            return emailStep2(data);
        }

     })
    
})


}

// Compose the HTML in the language
function emailStep2(data){
    console.log('email step 2!')
    data.html= `no language set`  
    data.url=data.location.apply_url+"/referenceForm/"+data.hash
     
     
    if(data.refData.user_set.language=="en")
    {
        var schoolDate="";
        if(data.school)
        {       
            schoolDate=data.school.name+" "+moment(data.school.start_date).format("MM/DD/YYYY")
            var appFor="a school";
            var school="<p>School:<br>"+schoolDate+"</p>";
        }
        
        if(data.appData.type=='staff')
        {
            var appFor="Staff";
            var school="<p></p>";
        }
        else if(data.appData.type=='missionbuilder')
        {
            var appFor="Missionbuilder";
            var school="<p></p>";
        }
        
        data.html=`Dear ${data.refData.user_set.name},<br><br> `+
        `We are sending you this email because ${data.userData.first_name} ${data.userData.last_name} has applied for ${appFor} at Youth with a Mission ${data.location.name}. `+
        `${school}`+
        `To better understand ${data.userData.first_name}'s application, we ask that you complete our online reference form. <br>Please click the link below to continue: <br>`+
        `<a href="${data.url}">${data.url}</a>`
     
     
    }
    else if(data.refData.user_set.language=="de")
    {
        var schoolDate="";
        if(data.school)
        {
            schoolDate=data.school.name+" am "+moment(data.school.start_date).format("DD.MM.YYYY")
            var appFor="für eine Schule";
            var school="<p>Schule:<br>"+schoolDate+"</p>";
        }
        
        if(data.appData.type=='staff')
        {
            var appFor="als Mitarbeiter";
            var school="<p></p>";
        }
        else if(data.appData.type=='missionbuilder')
        {
            var appFor="als Missionbuilder";
            var school="<p></p>";
        }
        
        data.html=`Guten Tag ${data.refData.user_set.name},<br><br> `+
        `Diese E-Mail wurde versandt, weil ${data.userData.first_name} ${data.userData.last_name} sich ${appFor} bei Jugend mit einer Mission ${data.location.name} beworben hat.`+
        `${school}`+
        `Um ${data.userData.first_name}‘s Bewerbung besser zu verstehen, bitten wir, dieses Online - Empfehlungsschreiben auszufüllen. <br>Das Empfehlungsschreiben kann über den folgenden Link abgerufen werden:<br>`+
        `<a href="${data.url}">${data.url}</a>`
     
     
    }
   return emailStep3(data);
}


function emailStep3(data){
     console.log('email step 3!')
    //get mailgun auth details
   return admin.database().ref('/location_private/').once('value').then(function(snap){
       
         var auth = { auth: snap.val().mailgun }
        var nodemailerMailgun = nodemailer.createTransport(mg(auth));
       
       if(data.refData.user_set.language=="en"){
           data.subject="Reference Request";
       }
       if(data.refData.user_set.language=="de"){
           data.subject="Ausfüllen eines Empfehlungsschreibens";
       }
    
        
      return nodemailerMailgun.sendMail({
           from:'"YWAM Sarasota" <info@ywamsarasota.com>',
           to: data.refData.user_set.email, // An array if you have multiple recipients.
           //cc:'second@domain.com',
           //bcc:'secretagent@company.gov',
           subject: data.subject,
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
                                                                    
                                                                    
  });