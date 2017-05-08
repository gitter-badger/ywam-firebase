class AccountingDesignationsController {
   /* @ngInject */
  constructor($firebaseObject, Site ) {
    var ctrl = this;
        ctrl.addbtn = addbtn  
      

        var Ref = firebase.database().ref('/designation_codes')
         ctrl.designations = $firebaseObject(Ref)
        // Ref.on('value',function(snap){
        //   ctrl.designations = snap.val()
        // })

         firebase.database().ref('/location_public/meta/staff_url')
           .on('value',function(snap){
           ctrl.base_url = snap.val()
        })

        function addbtn($event){
          var template =`<designation-edit in-dialog="true"></designation-edit>`;

          Site.showDialog($event, template )

        }
  }
}

export default AccountingDesignationsController;
