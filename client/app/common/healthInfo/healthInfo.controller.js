class HealthInfoController {
  constructor() {
      var ctrl = this
      console.log('loading health info for'+ctrl.userId)
     var userRef = firebase.database().ref('profiles').child(ctrl.userId).child('health')

      userRef.on('value',function(userSnap){
        ctrl.health = userSnap.val()
      })
  }
}

export default HealthInfoController;
