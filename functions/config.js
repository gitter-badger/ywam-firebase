
//Firebase admin
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
exports.admin = admin

var serviceAccount = require("./staffapp-35bae404b4bf.json");//Note that we hope to add support for createCustomToken() from the default credential in the future, but for now, you will have to bring your own credential for this particular method to work.
exports.secondAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().firebase.databaseURL,
  apiKey : functions.config().firebase.apiKey,
  authDomain:  functions.config().firebase.authDomain
}, "secondAdmin");




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