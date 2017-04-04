
//Firebase admin
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.admin = admin


// Slack 
var Botkit = require('botkit');


var slackController = Botkit.slackbot({
 // debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});


var slack =  slackController.spawn({
  token: functions.config().slack.token,
})


function sendToChannel(channel, message_text){

// channel = '#systemlog';C246YD6LU
console.log('recived message '+message_text)

 return   new Promise(function(resolve, reject) {

     slack.say( {
                channel:channel,
                text:message_text
                // attachments: [{
                //      author_name: user_name,
                //      author_icon:response.user.profile.image_24,
                //      thumb_url:response.user.profile.image_72,
                //       text:   message.text,
                //       color:'#0099e6'
                //     }
                // ]
                },function(err,res) {
                if (err) {
                reject(err);
                } else {
                resolve(res);
                }
             });
           
        })

}
exports.slack = sendToChannel