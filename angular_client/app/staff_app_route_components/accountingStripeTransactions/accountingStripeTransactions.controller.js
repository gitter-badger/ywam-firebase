class AccountingStripeTransactionsController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'accountingStripeTransactions';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.accountingStripeTransactions = snap.val()
        // })
  }
}

export default AccountingStripeTransactionsController;
