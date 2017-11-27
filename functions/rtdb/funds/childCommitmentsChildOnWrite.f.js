var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

exports = module.exports =   functions.database.ref('/funds/{fundId}/commitments/{commitmentId}')
    .onWrite(event => {

       const fund_id  = event.params.fundId
       const commitment_id = event.params.commitmentId
       var bill = event.data.val()
       const p = [];

       //find commitments on the schedule 
       var start_date = moment().subtract(45,'days').format("YYYY-MM-DD")
       var end_date = moment().add(2,'months').format("YYYY-MM-DD")
       p[p.length] = admin.database().ref('/fund_scheduled_bills').orderByKey()
       .startAt(start_date).endAt(end_date).once('value').then(function(snap){
            
            snap.forEach(function(daysnap){
                  // console.log(daysnap.key)
                  var day = daysnap.val()
                  // console.log(day)
                  if(day[commitment_id] && !day[commitment_id].compleated){
                        
                               var data = {fund_id:fund_id,
                                          name: bill.name,
                                          fixed_amount: bill.fixed_amount||null,
                                          low_amount: bill.low_amount ||null,
                                          high_amount: bill.high_amount||null,
                                          }
                      
                        //if day is the right day update else remove from schedule 
                       
                       
                        if(bill.repeat =='monthly'){
                              
                             var daystoadd = bill.due_by - 1
                            var first_day =  moment(daysnap.key).format("YYYY-MM-01")
                            var date_it_should_be =  moment(first_day).add(daystoadd,'days' ).format("YYYY-MM-DD")
                            if(date_it_should_be == daysnap.key){
                              console.log('bill is on the right scheduled day updating')
                              
                               p[p.length] = admin.database().ref('/fund_scheduled_bills/'+daysnap.key+'/'+commitment_id).update(data)
                            }else{
                                    console.log('bill is on the wrong scheduled day removing from '+daysnap.key)
                                    console.log('commitment should be on '+ bill.due_by + ': '+date_it_should_be + 'adding there' )
                                   p[p.length] = admin.database().ref('/fund_scheduled_bills/'+daysnap.key+'/'+commitment_id).remove()
                                 p[p.length] = admin.database().ref('/fund_scheduled_bills/'+date_it_should_be+'/'+commitment_id).update(data)

                         }

                         }


                  }

            })

      
       })


          return Promise.all(p);

    })

