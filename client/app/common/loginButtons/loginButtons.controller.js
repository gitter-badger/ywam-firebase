class LoginButtonsController {
  /* @ngInject */
  constructor(Auth,$mdMedia,$stateParams,$mdMenu,$state) {
      var ctrl = this
      //  ctrl.auth = Auth;
       ctrl.login = login;
       ctrl.emailPassLogin = emailPassLogin;
      ctrl.app_for = $stateParams.app_for;
      ctrl.hideSignUp= $state.is('start')

       function login(provider){
         if($mdMedia('gt-sm'))
          Auth.$signInWithPopup(provider).catch(function(error) {
                          
                          console.log(error)
                          // Handle Errors here.
                          var errorCode = error.code;
                          var errorMessage = error.message;
                          // The email of the user's account used.
                          var email = error.email;
                          // The firebase.auth.AuthCredential type that was used.
                          var credential = error.credential;
                          // ...
                        });// popup is faster onf desktop

         else //for mobiles it works better to do Redirect
         Auth.$signInWithRedirect(provider);
      
    
   }
      
      function emailPassLogin(){
    
       Auth.$signInWithEmailAndPassword(ctrl.email, ctrl.password).then(function(result){

         ctrl.email = ''
         ctrl.password = ''
$mdMenu.hide()
        // console.log(result)
       })
        .catch
            (
                function(error)
                {
                    console.log(error)
                    ctrl.error_key = error.code.replace(/[/[\]'.]/g, "");
                    console.log('error_key for translation:'+ ctrl.error_key)

                }
            )
      }
       


  }
}

export default LoginButtonsController;
