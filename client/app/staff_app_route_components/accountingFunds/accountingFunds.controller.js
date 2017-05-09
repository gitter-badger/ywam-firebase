class AccountingFundsController {
   /* @ngInject */
 constructor($firebaseObject, Site ) {
    var ctrl = this;
        ctrl.addbtn = addbtn  
      

        var Ref = firebase.database().ref('/funds')
         ctrl.funds = $firebaseObject(Ref)
        // Ref.on('value',function(snap){
        //   ctrl.designations = snap.val()
        // })

         firebase.database().ref('/location_public/meta/staff_url')
           .on('value',function(snap){
           ctrl.base_url = snap.val()
        })

        function addbtn($event){
          var template =`<fund-edit></fund-edit>`;

          Site.showDialog($event, template )

        }
  }
}

export default AccountingFundsController;
