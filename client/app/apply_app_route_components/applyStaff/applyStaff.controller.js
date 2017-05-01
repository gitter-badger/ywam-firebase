class ApplyStaffController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        
        ctrl.location = Site.location
console.log(ctrl.location);
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.applyStaff = snap.val()
        // })
  }
}

export default ApplyStaffController;
