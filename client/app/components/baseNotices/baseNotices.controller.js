class BaseNoticesController {
    /* @ngInject */
  constructor(Site, $firebaseObject,$scope) {
    var ctrl = this

    var location_notices_ref = firebase.database().ref('locations_public').child(Site.location_id).child('notices')
    
        $firebaseObject(location_notices_ref).$bindTo($scope, "notices");

   }
}

export default BaseNoticesController;
