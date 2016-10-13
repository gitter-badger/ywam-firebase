class SchoolPageController {
    /* @ngInject */
  constructor($stateParams, $firebaseObject, $rootScope, $state) {
    var ctrl = this;
    //Update the current state for the nav bar
    $rootScope.$on('$viewContentLoaded',function(){ ctrl.current = $state.current.name})

    // var school_id = $stateParams.school_id;

    // var school_ref = firebase.database().ref('/schools/'+school_id + '/public')

    // ctrl.school = $firebaseObject(school_ref);
    
  }
}

export default SchoolPageController;
