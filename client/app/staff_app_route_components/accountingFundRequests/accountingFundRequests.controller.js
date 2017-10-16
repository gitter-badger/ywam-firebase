class AccountingFundRequestsController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'accountingFundRequests';

        var Ref = firebase.database().ref('/fund_requests')
        Ref.on('value',function(snap){
          ctrl.accountingFundRequests = snap.val()
        })

      //  Ref.

  }
}

export default AccountingFundRequestsController;
