const functions = require('firebase-functions');
var Botkit = require('botkit');

var slackController = Botkit.slackbot({
 debug: false,
 log: false
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});



function sendToChannel(channel, message_text){


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
   







function notification(message,options){


console.log(options)

return sendToChannel('C0K401WLV',message)


}

exports.notification = notification