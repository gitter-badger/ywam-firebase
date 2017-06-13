var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const moment = require('moment');


exports.updateStats = functions.database.ref('/funds/{fundId}/commitments/')
    .onWrite(event => {

       const fund_id  = event.params.fundId
       const promises = [];

       var amount_paid =0
       var amount_topay_low=0
       var amount_topay_high=0
       var date = new Date()
       var current_month = moment().format("YYYY-MM");
        event.data.forEach(function(item){
                var key = item._childPath //don't know what is up here.. perhaps they change it to be .key
                var commitment = item.val()
                  
                  
               //now look at  this month's fulfillments 
               if(commitment.fulfillments && commitment.fulfillments[current_month] && commitment.fulfillments[current_month].compleated){
                     amount_paid += +commitment.high_amount//DO TO find a solution here
                }else{
                     if(commitment.fixed_amount){
                          amount_topay_low += +commitment.fixed_amount
                          amount_topay_high += +commitment.fixed_amount
                    }else{
                          amount_topay_low += +commitment.low_amount
                          amount_topay_high += +commitment.high_amount
                    }
                }
                });//end foreach commitment

              

        //save it back
        var data = {amount_topay_high:amount_topay_high,
                    amount_topay_low:amount_topay_low,
                     amount_paid:amount_paid }
         promises.push(admin.database().ref('funds').child(fund_id).child('stats/'+current_month).set(data));


          return Promise.all(promises);

    })