class ApplyDashboardController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'applyDashboard';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.applyDashboard = snap.val()
        // })
  }
}

export default ApplyDashboardController;
