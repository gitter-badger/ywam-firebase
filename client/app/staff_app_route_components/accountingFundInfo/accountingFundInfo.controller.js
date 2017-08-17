class AccountingFundInfoController {
   /* @ngInject */
   constructor($stateParams,$firebaseObject, Site, $timeout) {
    var ctrl = this;
        
        ctrl.code = $stateParams.code;
        ctrl.addCommitment = addCommitment
        ctrl.editDialog = editDialog
        ctrl.editCommitmentDialog = editCommitmentDialog
        
         var  fundRef = firebase.database().ref('/funds').child(ctrl.code)
              ctrl.fund = $firebaseObject(fundRef)

        firebase.database().ref('/fund_subscriptions').orderByChild('fund_id').equalTo(ctrl.code)
          .on('value',function(snap){
          ctrl.subscriptions = snap.val()
          snap.forEach(function(subscription){
             var uid = subscription.val().contact_id
             var subkey = subscription.key
          if(uid){
          firebase.database().ref('crm/'+uid +'/name').once('value',(snap)=>{
              ctrl.subscriptions[subkey].payer_name = snap.val().first_name +' '+ snap.val().last_name
               $timeout()
          }) }
          })
         
        })

          firebase.database().ref('/location_public/meta/staff_url')
           .on('value',function(snap){
           ctrl.base_url = snap.val()
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
         function editCommitmentDialog($event, fund_id, commitment_id){
          var template =`<fund-commitment-edit fund-id="${fund_id}" commitment-id="${commitment_id}"></fund-commitment-edit>`;
          Site.showDialog($event, template )

        }
        function editDialog($event){
          var template =`<fund-edit code="${ctrl.code}"></fund-edit>`;
          Site.showDialog($event, template )
        }

        function getPayerName(index){
        }

  }
}

export default AccountingFundInfoController;
