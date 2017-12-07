const functions = require('firebase-functions');

const email = require('../email')

exports = module.exports  = functions.https.onRequest((req, res) => {
 
  let to = req.query.to;
  var params ={
    subject:'this is a TEST email Subject',
    
    data:{
      body:'this is body text!',
    }
  }

  email.send( params ).then(()=>{
    return res.status(200).send('Test Email Sent!');
  })

})