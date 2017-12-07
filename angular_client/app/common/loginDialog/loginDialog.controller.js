class LoginDialogController {
  /* @ngInject */
  constructor(Auth, $scope,$state) {
    var ctrl = this;
  //  console.log(Site.showLoginDialog)
   
  $scope.$on('showLoginDialog', function(event, args) {
    ctrl.visible =true; //Site.showLoginDialog
    // do what you want to do
  });
   $scope.$on('hideLoginDialog', function(event, args) {
    ctrl.visible =false; //Site.showLoginDialog
    // do what you want to do
  });

    Auth.$onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser && ctrl.visible){
          $state.reload()//note this causes a problem when using token auth as in referenceForm  added if visble to have it run only for this dialog

         ctrl.visible =false;
       
      }
     
    });

  }
}

export default LoginDialogController;
