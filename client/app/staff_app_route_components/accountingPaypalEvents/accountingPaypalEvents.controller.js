class AccountingPaypalEventsController {
   /* @ngInject */
  constructor($firebaseObject) {
    var ctrl = this;
        
        ctrl.name = 'accountingPaypalEvents';

        var Ref = firebase.database().ref('/paypal_events')
        ctrl.events = $firebaseObject(Ref)
        // Ref.on('value',function(snap){
        //   ctrl.accountingPaypalEvents = snap.val()
        // })
  }
}

export default AccountingPaypalEventsController;
