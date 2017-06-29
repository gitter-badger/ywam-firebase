class AccountingFundInfoController {
   /* @ngInject */
   constructor($stateParams,$firebaseObject, Site, $timeout) {
    var ctrl = this;
        
        ctrl.code = $stateParams.code;
        ctrl.addCommitment = addCommitment
        
         var  fundRef = firebase.database().ref('/funds').child(ctrl.code)
              ctrl.fund = $firebaseObject(fundRef)

        firebase.database().ref('/designation_subscriptions').orderByChild('designation_code').equalTo(ctrl.code)
          .on('value',function(snap){
          ctrl.subscriptions = snap.val()
          $timeout()
        })

        firebase.database().ref('/paypal_payments').orderByChild('item_number').equalTo(ctrl.code)
          .on('value',function(snap){
          ctrl.paypal_payments = snap.val()
        })

        function addCommitment($event, fund_id){
          var template =`<fund-commitment-edit fund-id="${fund_id}"></fund-commitment-edit>`;
          Site.showDialog($event, template )

        }
  }
}

export default AccountingFundInfoController;
