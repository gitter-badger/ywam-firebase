class AuthController {
   /* @ngInject */
  constructor($stateParams,$timeout,$state) {
    var ctrl = this;
    var actionCode=$stateParams.oobCode
        
        ctrl.name = 'auth';
ctrl.mode=$stateParams.mode
ctrl.resetPassword=resetPassword
ctrl.recoverEmail=recoverEmail
ctrl.verifyEmail=verifyEmail
ctrl.$onInit = onInit


function onInit(){
    checkActionCode()
}


function checkActionCode(){
 firebase.auth().checkActionCode(actionCode).then(function(info) {
 console.log(info) 
 ctrl.info=info.data
}).catch(function(error){
        ctrl.invalidLink = true
        ctrl.error_key = error.code.replace(/[/[\]'.]/g, "");
        $timeout()
        console.log('error_key for translation:'+ ctrl.error_key)
        console.log(error)
      })
}


function resetPassword(){
firebase.auth().confirmPasswordReset(actionCode, ctrl.password).then(function(resp) {
      // Password reset has been confirmed and new password updated.

      // TODO: Display a link back to the app, or sign-in the user directly
      // if the page belongs to the same domain as the app:
      firebase.auth().signInWithEmailAndPassword(ctrl.info.email, ctrl.password);
      $state.go('apply.dashboard')
    }).catch(function(error) {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
       ctrl.error_key = error.code.replace(/[/[\]'.]/g, "");
       $timeout()
      console.log(error)
    });

}
function recoverEmail(){
  
}
function verifyEmail(){
  
}
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.auth = snap.val()
        // })
  }
}

export default AuthController;
