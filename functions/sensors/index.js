var functions = require('firebase-functions');
const admin = require('../config.js').admin;
// CORS Express middleware to enable CORS Requests.
// const cors = require('cors')({origin: true});



exports.post = functions.https.onRequest((req, res) => {

  console.log('Body: ',req.body)
  var p = []
  var data = req.body      


//   p[p.length] =  admin.database().ref('sensors').push(data)                


p[p.length] = res.status(200).send('Thanks for the update');

return Promise.all(p)
})
