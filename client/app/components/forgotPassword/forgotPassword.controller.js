class ForgotPasswordController {
   /* @ngInject */
  constructor(Auth) {
  
    var ctrl = this; 

        ctrl.send = function(){

          var emailAddress = ctrl.email;

          Auth.$sendPasswordResetEmail(emailAddress).then(function(result) {
                console.log(result)
                  // Email sent.
                  ctrl.message = 'Please check your email';
                }, function(error) {
                  // An error happened.
                  console.log(error)
                });

        }

  }
}

export default ForgotPasswordController;
