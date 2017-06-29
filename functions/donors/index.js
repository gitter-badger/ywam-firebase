const functions = require('firebase-functions');
const admin = require('../config.js').admin;
var moment = require('moment');


exports.process = functions.database.ref('/donors/{donorsId}/years/{year}/transactions').onWrite(event => {





    var transactions = event.data.val()

    var year_to_date = 0;
    var transaction_count = 0

    event.data.forEach(function(item){

        var transaction = item.val()

            year_to_date += +transaction.amount
            transaction_count++


    })

    var updates ={ year_to_date_total:year_to_date,
                  transaction_count:transaction_count}

  return  event.data.ref.parent.update(updates)
   
})