class ApplyStaffController {
   /* @ngInject */
  constructor(Site, $translate) {
    var ctrl = this;
        
        ctrl.location = Site.location

        ctrl.lang_key = $translate.use().toUpperCase()
     
        console.log(ctrl.lang_key)
        console.log(ctrl.location);
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.applyStaff = snap.val()
        // })
  }
}

export default ApplyStaffController;
