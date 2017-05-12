class BaseContactsController {
   /* @ngInject */
  constructor($timeout) {
    var ctrl = this;
        
        ctrl.name = 'baseContacts';
        ctrl.contacts =[]

        var Ref = firebase.database().ref('/profiles')
        Ref.on('child_added',function(snap){
         
          var data = snap.val()
              data.id = snap.key
          ctrl.contacts.push(data)
          $timeout()
        })
  }
}

export default BaseContactsController;
