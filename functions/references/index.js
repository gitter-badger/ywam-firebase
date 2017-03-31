var functions = require('firebase-functions');
const admin = require('../config.js').admin;



exports.sendEmail = functions.database.ref('/applications/{appId}/{refKey}/user/send_requested')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('refernece requested to be sent!', event.params.appId, event.params.refKey);
             admin.database().ref('/applications/'+event.params.appId+'/'+event.params.refKey+'/user/sent').set(true);
      return  admin.database().ref('/applications/'+event.params.appId+'/'+event.params.refKey+'/user/send_requested').set(false);


    });
