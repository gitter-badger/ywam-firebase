class SchoolPageController {
    /* @ngInject */
  constructor($stateParams, $firebaseObject, $rootScope, $state,Site, $timeout) {
    var ctrl = this;
    //Update the current state for the nav bar
    $rootScope.$on('$viewContentLoaded',function(){ ctrl.current = $state.current.name})

    var school_id = $stateParams.school_id;
    //get school name for header
    firebase.database().ref('/schools/'+school_id + '/public/name').once('value',function(snap){
      Site.title = snap.val()
      // $timeout()
    })

    // ctrl.school = $firebaseObject(school_ref);
    
  }
}

export default SchoolPageController;
