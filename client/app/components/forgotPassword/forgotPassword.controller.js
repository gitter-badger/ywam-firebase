class ForgotPasswordController {
   /* @ngInject */
  constructor(Auth,$state) {
  
    var ctrl = this; 

        ctrl.send = function(){

          var emailAddress = ctrl.email;
          Auth.$sendPasswordResetEmail(emailAddress).then(function(result) {
                console.log(result)
                  // Email sent.
                  ctrl.message = 'Please check your email';
                  ctrl.error_message = ''
                  
                }, function(error) {
                  // An error happened.
                  console.log(error)
                  ctrl.error_message =error.message;

                  ctrl.error_key = error.code.replace(/[/[\]'.]/g, "");
                  console.log('error_key for translation:'+ ctrl.error_key)

                });

        }

         Auth.$onAuthStateChanged(function(firebaseUser) {
              if(firebaseUser)
                $state.go('home')
          });

  }
}

export default ForgotPasswordController;
