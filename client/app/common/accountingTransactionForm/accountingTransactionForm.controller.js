class AccountingTransactionFormController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'accountingTransactionForm';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.accountingTransactionForm = snap.val()
        // })
  }
}

export default AccountingTransactionFormController;
