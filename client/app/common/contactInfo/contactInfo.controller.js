class ContactInfoController {
  constructor() {
   var ctrl = this
       
       ctrl.$onInit = function() {
 
     var userRef = firebase.database().ref('profiles').child(ctrl.userId)
         userRef.on('value',function(userSnap){
           ctrl.user = userSnap.val()
          })

      }//end on init


  }
}

export default ContactInfoController;
