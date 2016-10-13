class LoginDialogController {
  /* @ngInject */
  constructor(Auth, $scope,$state) {
    var ctrl = this;
  //  console.log(Site.showLoginDialog)
   
  $scope.$on('showLoginDialog', function(event, args) {
    ctrl.visible =true; //Site.showLoginDialog
    // do what you want to do
  });

    Auth.$onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser){
         ctrl.visible =false;
         $state.reload()
      }
     
    });

  }
}

export default LoginDialogController;
