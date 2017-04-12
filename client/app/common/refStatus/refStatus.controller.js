class RefStatusController {
  constructor($timeout) {
      var ctrl = this;
          ctrl.$onInit = onInit
              
              
    
          
      function onInit()
      {
        var refRef =  firebase.database().ref('applications/'+ ctrl.key) 
            refRef.on('value', function(snap){
                if(snap.val()){
                ctrl.status = snap.val().status
                $timeout()
                }
            })
          
      }
      
  }
}

export default RefStatusController;
