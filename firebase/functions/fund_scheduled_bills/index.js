var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const secureCompare = require('secure-compare');
var moment = require('moment');

exports.croncopybills = functions.https.onRequest((req, res) => {

  const key = req.query.key;

  // Exit if the keys don't match
  if (!secureCompare(key, '1234567890')) {
    console.log('The key provided in the request does not match the key set in the environment. Check that', key,
        'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
        'cron.key environment variable.');
    return;
  }

 var p =[]

  return admin.database().ref('funds').once('value').then(function(snap){

    new Promise(function(resolve,reject){
      snap.forEach(function(fundsnap){

         var fund = fundsnap.val()

            if(fund.commitments){

                console.log('found commitments for '+fundsnap.key)
                 Object.keys(fund.commitments).forEach(key => {
                     var bill = fund.commitments[key]
                     if(bill.repeat =='monthly'){

                        var daystoadd = bill.due_by - 1
                        var first_day_this_month = moment().format("YYYY-MM-01")
                        var first_day_next_month = moment().add(1,'months').format("YYYY-MM-01")
                     
                       var this_month =  moment(first_day_this_month).add(daystoadd,'days' ).format("YYYY-MM-DD")
                       var next_month = moment(first_day_next_month).add(daystoadd,'days' ).format("YYYY-MM-DD")
                       
                        var data = {fund_id:fundsnap.key,
                                    name: bill.name,
                                    fixed_amount: bill.fixed_amount||null,
                                    low_amount: bill.low_amount ||null,
                                    high_amount: bill.high_amount||null,
                                }

                         p[p.length] = admin.database().ref('fund_scheduled_bills/'+this_month+'/'+key).update(data)
                         p[p.length] = admin.database().ref('fund_scheduled_bills/'+next_month+'/'+key).update(data)
                       // console.log('Copied Bills on to schedule for '+ fundsnap.key) 
                        }


         });
   
            }
       


      })

      Promise.all(p).then(function(){
          resolve('finished')
      })
    })//end promise wrap 

  }).then(function(){
   return res.status(200).send('All is well');

    })
})
