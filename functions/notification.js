const functions = require('firebase-functions');
// var Botkit = require('botkit');
// var Slack = require('slack-node');
var WebClient = require('@slack/client').WebClient;

const admin = require('./config.js').admin;


function sendToChannel(channel, message_text){
     
     console.log('recived message '+message_text)
// if(1==1)
// return

// var slackController = Botkit.slackbot({
//  debug: false,
//  log: false
//   //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
// });
return   new Promise(function(resolve, reject) {

    var token = functions.config().slack.token;
    var web = new WebClient(token);
 
    // var slack =  slackController.spawn({
    // token: functions.config().slack.token,
    // })    

    // channel = '#systemlog';C246YD6LU
    

    

        web.chat.postMessage( channel,{
                    // text:message_text
                    username: "srqbot",
                    attachments: [{
                        //  author_name: user_name,
                        //  author_icon:response.user.profile.image_24,
                        //  thumb_url:response.user.profile.image_72,
                          text:   message_text,
                          color:'#44bda4'
                        }
                    ]
                    },function(err,res) {
                    if (err) {
                         console.log(err)
                    reject(err);
                   
                     } else {
                    console.log(res)
                    resolve(res);
                    
                    }
                });
            
            })

    }
   







function notification(message,type){


console.log(type)
if( type){
    var p=[]

p[p.length] = admin.database().ref('/system_notifications/'+type+'/slack_channels').once('value').then(snap => {
    if(snap.val()){
        console.log(snap.val())
        snap.forEach(function(channel){
            console.log(channel.key)
           p[p.length] = sendToChannel(channel.key,message)
        })
        
    }else{
        console.log('no slack channels found')
    }
    

    

 })

return Promise.all(p)

}else{
     console.log('no message type specified')
    return sendToChannel('C48NTKRLY',message)
    
}



}

exports.notification = notification