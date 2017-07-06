const functions = require('firebase-functions');
// var Botkit = require('botkit');
const admin = require('../config.js').admin;



exports.getChannelList = functions.database.ref('/slack/get_channel_list')
    .onWrite(event => {

  return   new Promise(function(resolve, reject) {

var slackController = Botkit.slackbot({
 debug: false,
 log: false
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

var slack =  slackController.spawn({
    token: functions.config().slack.token,
}) 

  slack.api.channels.list({},function(err,response) {
 
    console.log(response.channels)
    admin.database().ref('/slack/channels').set(response.channels)    

            slack.api.groups.list({},function(err,response) {
            
                        console.log(response.groups)
                        admin.database().ref('/slack/bot_groups').set(response.groups).then(function(){
                            resolve()
                        })    

            })



    })

  



  })

    })