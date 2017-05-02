class ApplyDashboardController {
   /* @ngInject */
  constructor(Site,$state) {
    var ctrl = this;
        ctrl.user_id=Site.user.id;
        
        if(Site.isStaff)
           Site.hideSideNav = false
      
      if(!ctrl.user_id){
          $state.go("apply.schoolList");
      }
          
          
           console.log('isStaff: '+Site.isStaff)
        
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.applyDashboard = snap.val()
        // })
  }
}

export default ApplyDashboardController;
