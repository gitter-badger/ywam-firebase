var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});


exports.delivered = functions.https.onRequest((req, res) => {

  console.log(req.body['statusRef'])
  if(!req.body['statusRef']){
    console.log('no status-ref in request.. not saving update' )
    return res.status(200).send('Thanks for the update');
  }
  
        var data = { current: 'delivered',
                  delivered: Date.now()}

  return admin.database().ref(req.body['statusRef']).update(data).then(function(){
    return res.status(200).send('Thanks for the update');
  })


});

exports.opened = functions.https.onRequest((req, res) => {



  console.log(req.body['statusRef'])
    if(!req.body['statusRef']){
      
    console.log('no statusRef in request.. not saving update')
    return res.status(200).send('Thanks for the update');
  }
        var data=  { current: 'opened',
                  opened: Date.now()}

   return admin.database().ref(req.body['statusRef']).update(data).then(function(){
    return res.status(200).send('Thanks for the update');
   })
  
});

exports.dropped = functions.https.onRequest((req, res) => {


   // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  cors(req, res, () => {
  // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]

      console.log('Body: ',req.body)
      console.log('Prams: ',req.params)
      console.log('Query: ',req.query)
      console.log('Type: ',req.type)
      console.log('statusRef: ',req.param('statusRef'))
  
  
    })
  
  
    if(!req.body['statusRef']){
      
    console.log('no statusRef in request.. not saving update')
    return res.status(200).send('no statusRef in request.. not saving update');
  }
        var data=  { current: 'dropped',
                     dropped: Date.now()}

   return admin.database().ref(req.body['statusRef']).update(data).then(function(){
    return res.status(200).send('Thanks for the update');
   })
  
});

