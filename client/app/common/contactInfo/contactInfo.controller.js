class ContactInfoController {
  constructor() {
   var ctrl = this
      console.log('loading contact info for'+ctrl.userId)
     var userRef = firebase.database().ref('profiles').child(ctrl.userId)

      userRef.on('value',function(userSnap){
        ctrl.user = userSnap.val()
      })


  }
}

export default ContactInfoController;
