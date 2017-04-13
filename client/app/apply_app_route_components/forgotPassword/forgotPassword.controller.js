class ForgotPasswordController {
   /* @ngInject */
  constructor(Auth) {
  
    var ctrl = this; 

        ctrl.send = function(){

          var emailAddress = ctrl.email;

          Auth.$sendPasswordResetEmail(emailAddress).then(function(result) {
                console.log(result)
                  // Email sent.
                  ctrl.checkEmail = true;
                }, function(error) {
                  // An error happened.
                  console.log(error)
                });

        }

  }
}

export default ForgotPasswordController;
