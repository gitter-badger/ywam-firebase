class BaseVisaRequirementsController {
/* @ngInject */
  constructor($firebaseArray, $firebaseObject, Site, $scope) {
    var ctrl = this;
     var nations_index_ref =  firebase.database().ref('/phrases/nations/en');
     var nations_requirements_ref =  firebase.database().ref('/locations_public').child(Site.location_id).child('nations')    
       
        $firebaseObject(nations_requirements_ref).$bindTo($scope, "nations");
        ctrl.nations_index = $firebaseArray(nations_index_ref)
           
  }
}

export default BaseVisaRequirementsController;
