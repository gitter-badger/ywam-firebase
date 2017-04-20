class ChangeUserPhotoController {
   /* @ngInject */
  constructor($stateParams) {
    var ctrl = this;
        
        ctrl.name = 'changeUserPhoto';
ctrl.userId=$stateParams.user_id
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.changeUserPhoto = snap.val()
        // })
  }
}

export default ChangeUserPhotoController;
