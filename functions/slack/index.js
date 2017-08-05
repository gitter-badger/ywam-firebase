const functions = require('firebase-functions');
var WebClient = require('@slack/client').WebClient;
const admin = require('../config.js').admin;



exports.getChannelList = functions.database.ref('slack/get_channel_list')
    .onWrite(event => {

  return   new Promise(function(resolve, reject) {
    
    var token = functions.config().slack.token;
    var web = new WebClient(token);

  web.channels.list({},function(err,response) {
 
    console.log(response.channels)
    admin.database().ref('/slack/channels').set(response.channels)    

            web.groups.list({},function(err,response) {
            
                        console.log(response.groups)
                        admin.database().ref('/slack/bot_groups').set(response.groups).then(function(){
                            resolve()
                        })    

            })



    })

  



  })

    })