const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.https.onRequest((req, res) => {

  var events = req.body
  // console.log('content type:' +req.get('Content-Type'))

  var emails = {}

  for (item of events) {
 
      item = item.msys

    if (item['message_event']) {
     
      console.log('message_event' + item['message_event'].message_id)
      emails[item['message_event'].message_id] = { message_event: item['message_event']}
    
    } else if(item['track_event']){
     
      console.log('track_event' + item['track_event'].message_id)
      emails[item['track_event'].message_id] = { track_event: item['track_event']}

    } else if(item['gen_event']){
      
       console.log('gen_event' + item['gen_event'].message_id)
       emails[item['gen_event'].message_id] = { gen_event: item['gen_event']}
 
    
    } else if(item['unsubscribe_event']){
      
       console.log('unsubscribe_event' + item['unsubscribe_event'].message_id)
       emails[item['unsubscribe_event'].message_id] = { unsubscribe_event: item['unsubscribe_event']}
 

    } else if(item['relay_event']){
      
       console.log('relay_event' + item['relay_event'].message_id)
       emails[item['relay_event'].message_id] = { relay_event: item['relay_event']}
 
     }else{
      console.log('an unhandeled message event found')
    }


  }
  console.log('number of messages' + events.length)
  // post.forEach(function(item){


  //     if(msys['message_event']){
  //       console.log('message_event' +event.message_id)
  //       emails[event.message_id] = {message_event :message_event}
  //     }else{
  //       console.log(msys)
  //     }




  // })
  // //because firebase does not like . or < or > or @ in keys
  // var  key = post['Message-Id'].replace(/[/[\]'<>.@]/g, "");

  // var data = { current: post['event']}

  // if( post.event =='accepted')
  //   data.accepted = Date.now()

  // if( post.event =='rejected')
  //   data.rejected = Date.now()

  // if( post.event =='delivered')
  //   data.delivered = Date.now()

  // if( post.event =='failed' )
  //   data.failed = Date.now()

  // if( post.event =='opened')
  //   data.opened = Date.now()  

  // if( post.event =='clicked')
  //   data.clicked = Date.now()  

  // if( post.event =='unsubscribed')
  //   data.unsubscribed = Date.now()  

  // if( post.event =='complained')
  //   data.complained = Date.now()  

  // if( post.event =='stored')
  //   data.stored = Date.now()  

  return admin.database().ref('emails/').update(emails).then(function () {
    return res.status(200).send('Thanks for the update! of' + events.length);
  })

})
