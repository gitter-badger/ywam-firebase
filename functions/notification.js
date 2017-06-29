const functions = require('firebase-functions');
var Botkit = require('botkit');
const admin = require('./config.js').admin;


function sendToChannel(channel, message_text){

var slackController = Botkit.slackbot({
 debug: false,
 log: false
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});


    var slack =  slackController.spawn({
    token: functions.config().slack.token,
    })    

    // channel = '#systemlog';C246YD6LU
    console.log('recived message '+message_text)

    return   new Promise(function(resolve, reject) {

        slack.say( {
                    channel:channel,
                    // text:message_text
                    attachments: [{
                        //  author_name: user_name,
                        //  author_icon:response.user.profile.image_24,
                        //  thumb_url:response.user.profile.image_72,
                          text:   message_text,
                          color:'#0099e6'
                        }
                    ]
                    },function(err,res) {
                    if (err) {
                    reject(err);
                    } else {
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