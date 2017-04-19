var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const notification = require('../notification').notification;


exports.newUser = functions.auth.user().onCreate(event => {
    
    var message = 'new account created for: '+ event.data.email

    return notification(message,{type:'account_created'})
});