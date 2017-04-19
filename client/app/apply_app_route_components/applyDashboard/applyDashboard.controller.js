class ApplyDashboardController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        
        
        if(Site.isStaff)
           Site.hideSideNav = false
          
          
           console.log('isStaff: '+Site.isStaff)
        
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.applyDashboard = snap.val()
        // })
  }
}

export default ApplyDashboardController;
