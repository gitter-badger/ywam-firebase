class AccountingStripeEventsController {
   /* @ngInject */
  constructor($firebaseObject) {
    var ctrl = this;
        
        ctrl.name = 'accountingStripeEvents';

        var Ref = firebase.database().ref('/stripe_events')
        ctrl.events = $firebaseObject(Ref)
        // Ref.on('value',function(snap){
        //   ctrl.accountingStripeEvents = snap.val()
        // })
  }
}

export default AccountingStripeEventsController;
