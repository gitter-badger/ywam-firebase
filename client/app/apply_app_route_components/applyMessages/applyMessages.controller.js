class ApplyMessagesController {
   /* @ngInject */
  constructor(Auth) {
    var ctrl = this;
        ctrl.signInAnonymously = signInAnonymously
        ctrl.linkEmail = linkEmail 
        ctrl.updateEmail = updateEmail
        ctrl.postMessage = postMessage
        ctrl.channel = 'general'
        
       


        function signInAnonymously(){
          firebase.auth().signInAnonymously().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }

        // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
        ctrl.firebaseUser = firebaseUser
        if(firebaseUser)
        firebase.database().ref('profiles/'+ctrl.firebaseUser.uid+'/channels/').on('value',function(snap){
          ctrl.channels = snap.val()
        })
        })

        function updateEmail(){
          Auth.$updateEmail(ctrl.email).then(function() {
            console.log("Email changed successfully!");
          }).catch(function(error) {
            console.error("Error: ", error);
          });
        }

      function linkEmail(){
        var credential = firebase.auth.EmailAuthProvider.credential(ctrl.email,ctrl.password);
        console.log(credential)

        ctrl.firebaseUser.link(credential).then(function(user) {
          console.log("Account linking success", user);
        }, function(error) {
          console.log("Account linking error", error);
        });
      }

      function postMessage(){
        var message ={ time:firebase.database.ServerValue.TIMESTAMP,
                        text:ctrl.new_message,
                      from_user_id:ctrl.firebaseUser.uid }

        firebase.database().ref('profiles/'+ctrl.firebaseUser.uid+'/channels/'+ctrl.channel+'/messages').push(message).then(function(){
          ctrl.new_message = null;
        })

      }  
  }
}

export default ApplyMessagesController;
