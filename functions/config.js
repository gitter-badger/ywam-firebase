
//Firebase admin
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
exports.admin = admin

var serviceAccount = require("./staffapp-35bae404b4bf.json");//Note that we hope to add support for createCustomToken() from the default credential in the future, but for now, you will have to bring your own credential for this particular method to work.
exports.secondAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().firebase.databaseURL,
  apiKey : functions.config().firebase.apiKey,
  authDomain:  functions.config().firebase.authDomain
}, "secondAdmin");

