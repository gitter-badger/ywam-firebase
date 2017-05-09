class AccountingFundInfoController {
   /* @ngInject */
   constructor($stateParams,$firebaseObject) {
    var ctrl = this;
        
        ctrl.code = $stateParams.code;
        
         var  fundRef = firebase.database().ref('/funds').child(ctrl.code)
              ctrl.fund = $firebaseObject(fundRef)

        firebase.database().ref('/designation_subscriptions').orderByChild('designation_code').equalTo(ctrl.code)
          .on('value',function(snap){
          ctrl.subscriptions = snap.val()
        })

        firebase.database().ref('/paypal_payments').orderByChild('item_number').equalTo(ctrl.code)
          .on('value',function(snap){
          ctrl.paypal_payments = snap.val()
        })
  }
}

export default AccountingFundInfoController;
