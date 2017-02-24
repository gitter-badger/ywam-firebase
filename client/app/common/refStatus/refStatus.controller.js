class RefStatusController {
  constructor() {
      var ctrl = this;
          ctrl.$onInit = onInit
              
              
    
          
      function onInit()
      {
        var refRef =  firebase.database().ref('applications/'+ ctrl.key)
            refRef.on('value', function(snap){
                ctrl.status = snap.val().status
            })
          
      }
      
  }
}

export default RefStatusController;
