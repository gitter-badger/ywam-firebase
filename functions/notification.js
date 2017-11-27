const functions = require('firebase-functions');
// var Botkit = require('botkit');
// var Slack = require('slack-node');
var WebClient = require('@slack/client').WebClient;

const admin = require('./config.js').admin;


function sendToChannel(channel, message_text){
     
     console.log('recived message '+message_text)
 return admin.database().ref('/location_private/slack').once('value').then(function(snap){

return   new Promise(function(resolve, reject) {

    var token = snap.val().token;
    var web = new WebClient(token);

        web.chat.postMessage( channel, message_text ,function(err,res) {
                    if (err) {
                         console.log(err)
                    reject(err);
                   
                     } else {
                   // console.log(res)
                    resolve(res);
                    
                    }
                });
            
            })
  })//end getting of token
}//end function
   







function notification(message,type,notificaiton_object ){


// console.log(type)
if( type){
    var p=[]

p[p.length] = admin.database().ref('/system_notifications/'+type+'/slack_channels').once('value').then(snap => {
    if(snap.val()){
       // console.log(snap.val())
        snap.forEach(function(channel){
         //   console.log(channel.key)
           p[p.length] = sendToChannel(channel.key,message)
        })
        
    }else{
        console.log('no slack channels found')
    }
    

    

 })

return Promise.all(p)

}

if( notificaiton_object){
    var p=[]

    if(notificaiton_object.slack_channels){

         Object.keys( notificaiton_object.slack_channels).forEach(key => {
                     var value = notificaiton_object.slack_channels[key]
   
           // console.log(key)
           p[p.length] = sendToChannel(key,message)
        })
        
    }else{
        console.log('no slack channels found')
    }

return Promise.all(p)

}




if(!type &&  !notificaiton_object){
     console.log('no message type specified')
    return sendToChannel('C48NTKRLY',message)
    
}



}

exports.notification = notification