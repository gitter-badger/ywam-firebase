class BaseProjectsController {
    /* @ngInject */
  constructor($firebaseArray, Site, $firebaseObject) {
    var ctrl = this;

    var Ref = firebase.database().ref('locations/'+Site.location_id+'/projects')
        ctrl.projects = $firebaseArray(Ref)

      var FundRef = firebase.database().ref('locations/'+Site.location_id+'/funds')
        ctrl.funds = $firebaseObject(FundRef)    
  }
}

export default BaseProjectsController;
