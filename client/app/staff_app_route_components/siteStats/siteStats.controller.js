class SiteStatsController {
   /* @ngInject */
  constructor($timeout) {
    var ctrl = this;
        
       

        var Ref = firebase.database().ref('/app_log')
        Ref.on('value',function(snap){
          ctrl.siteStats = snap.val()
          $timeout()
         
        })
  }
}

export default SiteStatsController;
