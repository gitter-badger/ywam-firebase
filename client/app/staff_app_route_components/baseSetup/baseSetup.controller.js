class BaseSetupController {
   /* @ngInject */
  constructor($timeout,Site, $firebaseObject,$scope ) {
    var ctrl = this;
        
        ctrl.site = Site

        var Ref = firebase.database().ref('/location_public')
            Ref.on('value',function(snap){
              ctrl.location_public = snap.val()
            })

        var rolesRef = firebase.database().ref('/site_roles')
            rolesRef.on('value',function(snap){
              ctrl.roles = snap.val()
              $timeout()
            })    

        var locPrivateRef = firebase.database().ref('/location_private')

         $firebaseObject(locPrivateRef).$bindTo($scope, "$ctrl.location_private");

            // locPrivateRef.on('value',function(snap){
            //   ctrl.location_private = snap.val()
            //   $timeout()
            // })      
  }
}

export default BaseSetupController;
