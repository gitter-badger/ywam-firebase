class ContactManagementEditFormController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'contactManagementEditForm';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.contactManagementEditForm = snap.val()
        // })
  }
}

export default ContactManagementEditFormController;
