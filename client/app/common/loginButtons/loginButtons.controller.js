class LoginButtonsController {
  /* @ngInject */
  constructor(Auth,$mdMedia,$stateParams,$mdMenu,$state, $timeout) {
        var ctrl = this
            ctrl.login = login;
            ctrl.emailPassLogin = emailPassLogin;
            ctrl.app_for = $stateParams.app_for;
            ctrl.hideSignUp= $state.is('start')

function login(provider){
         if($mdMedia('gt-sm'))
             Auth.$signInWithPopup(provider)// popup is faster onf desktop
                 .then(function(result){handleProviderLogin(result)})
                 .catch(function(error){handleProviderLoginError(error)});

         else //for mobiles it works better to do Redirect
         
         Auth.$signInWithRedirect(provider) 
             .then(function(result){handleProviderLogin(result)})
             .catch(function(error){handleProviderLoginError(error)});


function handleProviderLogin(result){
            
            console.log(result.user)
            var uid = result.user.uid
            var displayName = result.user.providerData[0].displayName
            var email = result.user.providerData[0].email
            //check if user has first name.. if not we set it using the display name from the provider
           var contactRef =  firebase.database().ref('profiles/'+uid+'/contact/')
               contactRef.once('value',function(snap){
                
                if(snap.val() && snap.val().first_name){
                    //first name exists
                }else if(displayName){
                    contactRef.child('first_name').set(displayName)
                }

                if(snap.val() && snap.val().email){
                    //email exists
                }else if(email){
                    contactRef.child('email').set(email)
                }
            })


}

function handleProviderLoginError(error) {
                          
                          console.log(error)
                          // Handle Errors here.
                          var errorCode = error.code;
                          var errorMessage = error.message;
                          // The email of the user's account used.
                          var email = error.email;
                          if(email){
                          firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
                              console.log(providers)
                              if(providers[0]=='google.com')
                                var service = 'Google'
                              
                               ctrl.error_key = 'Email already associated with '+service+ ', try signin with ' + service
                               $timeout()
                          })
                            }//end if email exists
                            
                          // The firebase.auth.AuthCredential type that was used.
                          var credential = error.credential;
                          // ...
                        }


}
      
function emailPassLogin(){
    
             Auth.$signInWithEmailAndPassword(ctrl.email, ctrl.password)
                 .then(function(result){
                                ctrl.email = ''
                                ctrl.password = ''
                                $mdMenu.hide()
                                
                       })
                .catch(function(error){
                                console.log(error)
                                ctrl.error_key = error.code.replace(/[/[\]'.]/g, "");
                                console.log('error_key for translation:'+ ctrl.error_key)
                        })
        }//end function
       



  }
}

export default LoginButtonsController;
