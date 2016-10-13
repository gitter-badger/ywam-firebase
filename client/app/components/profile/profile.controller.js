class ProfileController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject) {
      var ctrl = this;
      var user_id = $stateParams.user_id    
      var Ref = firebase.database().ref('profiles/'+user_id)

          ctrl.profile = $firebaseObject(Ref);

  }
}

export default ProfileController;
