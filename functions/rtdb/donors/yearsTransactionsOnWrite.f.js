var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

exports = module.exports = functions.database.ref('/donors/{donorId}/years/{year}/transactions').onWrite(event => {

    if(event.data.previous.val() == event.data.val()){
        console.log('ignoring transactions write data is the exact same')
        return
    }

    

    var transactions = event.data.val()

    console.log('transactions write',transactions,event.data.previous.val())

    var ack_to_send = []

    var year_to_date = 0;
    var transaction_count = 0

    event.data.forEach(function(item){

        var transaction = item.val()
            transaction.id = item.key

            year_to_date += +transaction.amount
            transaction_count++
            
             if(!transaction.acknowledged)
                ack_to_send.push(transaction)

    })

    var updates = { year_to_date_total: year_to_date.toFixed(2) ,
                  transaction_count:transaction_count}

  return  event.data.ref.parent.update(updates).then(function(res){
      //because we need to wait till the year to date is updated! we triger the acknowlagement here
    if(ack_to_send.length>0)    
    return  sendAcknowledgement(event,ack_to_send)
  
})
   
})




 function sendAcknowledgement(event, ack_to_send ){

console.log( 'line 54',ack_to_send)
 var donor_id = event.params.donorId
 var year = event.params.year
 var p = []

//get transactions
return admin.database().ref('/donors/'+donor_id+'/years/'+year).once('value').then(function(yearSnap){

    var yearData = yearSnap.val()
    
    // console.log(yearData)

        //name of donor email of donor
    return  admin.database().ref('crm/'+donor_id+'/name').once('value').then(function(namesnap){
        var name = namesnap.val()
        var tranUpdates ={}

        var message =  `donation_acknowledged from : ${name.first_name} ${name.last_name}`+ 
                       `One day the system will send an email at this point to the donor acknowledging we have recived`+
                       `${ack_to_send.length} transactions "\n"`;
            //for each tran

            ack_to_send.forEach(function(tran){
            
            

            tranUpdates[tran.id] = {fund_id:tran.fund_id,
                                    date: tran.date,
                                    amount: tran.amount, 
                                    method: tran.method || null,
                                    acknowledged : true
                                            }   
            

              message += `${moment(tran.date).format('YYYY-MM-DD')} : $ ${tran.amount}  "\n"`

            })

          message +=  `and that their year todate total is now : $ ${yearData.year_to_date_total}`

            
             yearSnap.ref.child('transactions').update(tranUpdates).then(()=>{
           
              return   notification(message,'donation_acknowledged')
             
                    })

   })

 })   

   




}