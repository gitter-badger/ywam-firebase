class AppForController {
   /* @ngInject */
  constructor($timeout) {
    var ctrl = this;
      ctrl.$onInit=onInit;
      function onInit(){
     
        ctrl.name = 'appFor';
      var Ref=firebase.database().ref("applications/"+ctrl.appId+"/for")
      
      Ref.on('value', function(snap){
          
          ctrl.for=snap.val();
          if(ctrl.for && ctrl.for.school_id){
              firebase.database().ref("schools/"+ctrl.for.school_id+"/public").on('value', function(snap){
                  ctrl.school=snap.val();
                  $timeout();
              })
          }
      })
  }
      }
}

export default AppForController;
