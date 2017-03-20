var functions = require('firebase-functions');

exports.onCreate = functions.database.ref('/applications/{appId}/for/user_id')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('adding start date', event.params.appId, original);
     
      // add created timestamp & status of 1
         var data ={ status: 1,
                     statuses:{ 1: {date:  new Date().getTime()} }}
  

      return event.data.ref.parent.parent.child('meta').set(data);
    });

