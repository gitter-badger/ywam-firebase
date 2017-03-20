var functions = require('firebase-functions');

exports.applications = require('./applications/index.js')
exports.avatars = require('./avatars/index.js')

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

