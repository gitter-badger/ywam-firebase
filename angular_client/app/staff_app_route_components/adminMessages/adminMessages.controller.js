class AdminMessagesController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'adminMessages';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.adminMessages = snap.val()
        // })
  }
}

export default AdminMessagesController;
