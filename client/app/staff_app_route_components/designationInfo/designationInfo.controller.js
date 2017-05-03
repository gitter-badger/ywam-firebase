class DesignationInfoController {
   /* @ngInject */
   constructor($stateParams) {
    var ctrl = this;
        
        ctrl.code = $stateParams.code;

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

export default DesignationInfoController;
