class ContactInfoController {
     /* @ngInject */
  constructor($firebaseObject) {
   var ctrl = this
       
       ctrl.$onInit = function() {
 
     var userRef = firebase.database().ref('profiles').child(ctrl.userId)
        ctrl.contact= $firebaseObject(userRef.child('contact'))
        ctrl.em_contact= $firebaseObject(userRef.child('emergency_contact'))
        ctrl.postal= $firebaseObject(userRef.child('postal'))
         

      }//end on init


  }
}

export default ContactInfoController;
