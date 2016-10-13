class LoginButtonsController {
  /* @ngInject */
  constructor(Auth,$mdMedia, $firebaseAuth,Site,$timeout) {
      var ctrl = this
      //  ctrl.auth = Auth;
       ctrl.login = login
       ctrl.emailPassLogin = emailPassLogin;

   

       function login(provider){
         if($mdMedia('gt-sm'))
          Auth.$signInWithPopup(provider).catch(function(error) {
                        if(error.code == "auth/account-exists-with-different-credential"){

                          var credential = $firebaseAuth.FacebookAuthProvider.credential(
                                                   error.credential.accessToken);


                          $firebaseAuth.currentUser.link(credential).then(function(user) {
                              console.log("Account linking success", user);
                            }, function(error) {
                              console.log("Account linking error", error);
                            });

                        }  



                          console.log(error)
                          // Handle Errors here.
                          var errorCode = error.code;
                          var errorMessage = error.message;
                          // The email of the user's account used.
                          var email = error.email;
                          // The $firebaseAuth.AuthCredential type that was used.
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

        // console.log(result)
       })
       
       .catch(function(error) {
             
             console.log(error)
              // Handle Errors here.
            //  console.log('no user by that ..... creating one now ')

            //   $firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
            //   // Handle Errors here.
            //   var errorCode = error.code;
            //   var errorMessage = error.message;
            //   console.log(error)
            //   // ...
            // });


              
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });


       }
       


  }
}

export default LoginButtonsController;
