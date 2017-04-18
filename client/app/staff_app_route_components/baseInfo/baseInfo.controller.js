class BaseInfoController {
  /* @ngInject */
  constructor($firebaseObject, Site, $scope) {
    var ctrl = this
    var ref = firebase.database().ref('location_public') 
        //ref.on('value',function(snap))
        ctrl.info = $firebaseObject(ref)


        //watch for changes and call $save on firebaseObject
          $scope.$watch(function () {
            return ctrl.info.$value;
          },function(value) {
           ctrl.info.$save();
          }, true);
  }
}

export default BaseInfoController;
