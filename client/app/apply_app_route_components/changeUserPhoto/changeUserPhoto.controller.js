class ChangeUserPhotoController {
   /* @ngInject */
  constructor($stateParams,$state) {
    var ctrl = this;
        
        
        ctrl.userId=$stateParams.user_id
        ctrl.onCompleate = function(){
          console.log($state.previous)
          $state.go($state.previous.name, $state.previous.params)
        }
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.changeUserPhoto = snap.val()
        // })
  }
}

export default ChangeUserPhotoController;
