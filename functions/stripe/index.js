var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
// const cors = require('cors')({origin: true});



exports.webhook = functions.https.onRequest((req, res) => {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('Full URL' , fullUrl)
  console.log('Body: ',req.body)
  var p = []
  var data = req.body      


  p[p.length] =  admin.database().ref('stripe_events').push(data)                


p[p.length] = res.status(200).send('Thanks for the update');

return Promise.all(p)
})
