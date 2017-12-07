class BaseInfoController {
  /* @ngInject */
  constructor($firebaseObject, Site, $timeout) {
    var ctrl = this
    var ref = firebase.database().ref('/location_public/meta') 
        ref.on('value',function(snap){
          ctrl.meta = snap.val()
        })

        firebase.database().ref('/location/staff_groups') 
        .on('value',function(snap){
          ctrl.staff_groups = snap.val()
          $timeout()
        })       


        // var refSlack = firebase.database().ref('/slack') 
        // ctrl.slack = $firebaseObject(refSlack)


        //watch for changes and call $save on firebaseObject
          // $scope.$watch(function () {
          //   return ctrl.location_public.$value;
          // },function(value) {
          //  ctrl.location_public.$save();
          // }, true);
  }
}

export default BaseInfoController;
