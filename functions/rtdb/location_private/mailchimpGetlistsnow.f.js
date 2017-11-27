var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

var Mailchimp = require('mailchimp-api-v3')
 
exports = module.exports =   functions.database.ref('/location_private/mailchimp/getlistsnow')
    .onWrite(event => {
        if(event.data.val()){
         return   admin.database().ref('/location_private/mailchimp').once('value').then(function(snap){

            var api_key = snap.val().api_key

            var mailchimp = new Mailchimp(api_key);


            mailchimp.get('/lists')
                    .then(function(results) {
                        console.log(results)
                  return  admin.database().ref('/location_private/mailchimp/lists').set(results.lists)
                    })
                    .catch(function (err) {
                    console.log(err)
                    })
            })

        }})
