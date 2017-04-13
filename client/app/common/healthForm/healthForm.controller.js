class HealthFormController {
   /* @ngInject */
  constructor($scope, $timeout, Auth, $firebaseObject) {
   var ctrl = this;
   var user_id = Auth.$getAuth().uid

    var ref = firebase.database().ref('/profiles/' +user_id+'/health' );
         $firebaseObject(ref).$bindTo($scope, "health");

    $scope.$watch('$ctrl.healthForm.$valid',function(v){
            $timeout(function(){
              ctrl.isValid = ctrl.healthForm.$valid
            })
          })
  }
}

export default HealthFormController;
