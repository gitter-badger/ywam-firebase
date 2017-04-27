class RefStatusController {
     /* @ngInject */
  constructor($timeout) {
      var ctrl = this;
          ctrl.$onInit = onInit
              
              
    
          
      function onInit()
      {
        var refRef =  firebase.database().ref('applications/'+ ctrl.key+'/status') 
            refRef.on('value', function(snap){
                if(snap.val()){
                ctrl.status = snap.val()
                $timeout()
                }
            })
          
      }
      
  }
}

export default RefStatusController;
