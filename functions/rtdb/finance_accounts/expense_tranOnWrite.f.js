var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

exports = module.exports = functions.database.ref('/finance_accounts/{accountId}/expense_transactions').onWrite(event => {
  
        var unbookedCount = 0
        var unbookedTotal = 0
  
        event.data.forEach(function(snap){
          var tran = snap.val()
          if(!tran.booked && !tran.hidden){
            unbookedCount++
            unbookedTotal += (tran.gross - (+tran.fee || 0) )
  
          }
        })
  
        var updates ={unbookedExpenseCount:unbookedCount,
                      unbookedExpenseTotal:unbookedTotal}
  
           return     event.data.adminRef.parent.child('balances').update(updates)
  
  })
  
  