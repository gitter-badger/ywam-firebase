const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
// const multer = require('multer')

// var parser = multer().none()
var Busboy = require('busboy');
var inspect = require('util').inspect;

exports = module.exports  = functions.https.onRequest((req, res) => {
  var event_data = {}
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    event_data[fieldname] = inspect(val)
  });


  busboy.on('finish', function() {
    console.log('Done parsing form!');
    // res.writeHead(303, { Connection: 'close', Location: '/' });

    console.log(event_data)

    res.status(200).send('Thanks for the update');
    res.end();
  });

  // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
        // a callback when it's finished.
 busboy.end(req.rawBody);

  // parser(req, res, function(){
  //   let event_data = req.body

  //   consol.log(event_data)
  //   // Handle event data here
  //   if (!event_data.event)
  //   return res.send({error: "No event data"});

  //   // Required parameters
  //   if (!event_data.signature || !event_data.timestamp
  //     || !event_data.token || !event_data.domain)
  //     return res.send({error: "Core data missing"});
 
  //   let domain = event_data.domain;
  //   // Inconsistency in mailgun's API
  //   let messageId = event_data['message-id'] || event_data['Message-Id'];
  //   if (!messageId) {
  //     return res.send({error: 'Could not get message id'});
  //   }

  //     messageId = messageId.replace(/[\>\<]/g, '');


  //  return res.send({status:"ok"});
  // });

  // var post = req.body
  // console.log('content type:' +req.get('Content-Type'))
  // console.log(req.rawBody)

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

  // return admin.database().ref('emails/'+key).update(data).then(function(){
    // return res.status(200).send('Thanks for the update');
  // })

})
