class AccountingDesignationsController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
      

        var Ref = firebase.database().ref('/designation_codes')
        Ref.on('value',function(snap){
          ctrl.designations = snap.val()
        })

         firebase.database().ref('/location_public/meta/staff_url')
           .on('value',function(snap){
          ctrl.base_url = snap.val()
        })
  }
}

export default AccountingDesignationsController;
