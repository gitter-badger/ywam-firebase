class BaseInfoController {
  /* @ngInject */
  constructor($firebaseObject, Site, $scope) {
    var ctrl = this
    var ref = firebase.database().ref('/location_public/meta') 
        ref.on('value',function(snap){
          ctrl.meta = snap.val()
        })
        // ctrl.location_public = $firebaseObject(ref)


        //watch for changes and call $save on firebaseObject
          // $scope.$watch(function () {
          //   return ctrl.location_public.$value;
          // },function(value) {
          //  ctrl.location_public.$save();
          // }, true);
  }
}

export default BaseInfoController;
