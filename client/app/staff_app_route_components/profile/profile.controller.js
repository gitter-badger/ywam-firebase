class ProfileController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject, $timeout) {
      var ctrl = this;
          ctrl.user_id = $stateParams.user_id    
      var Ref = firebase.database().ref('profiles/'+ctrl.user_id)

          ctrl.profile = $firebaseObject(Ref);
          

          //once Angular Fire supports Storage https://github.com/firebase/angularfire/issues/785
          //this can be changed till then:
          Ref.on('value', snap=>{
            //   console.log(snap.val().contact.avatar_640)
            //   firebase.storage().refFromURL(snap.val().contact.avatar_640)
            //   .getDownloadURL().then(function(url){
            //    $timeout(function(){})
            //     ctrl.avatar_640 =  url 
            //     })
          })

  }
}

export default ProfileController;
