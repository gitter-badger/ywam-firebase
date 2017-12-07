// import template from './loginDialog.html';
/* @ngInject */
let UserFactory = function ($mdDialog) {
  const user = {};

  let getUser = () => {
    return user;
  };

  let isSignedIn = () => {
    return user.isSignedIn; 
  };



let loginDialog = () => {

var parentEl = angular.element(document.body);
      //  $mdDialog.show({
      //    parent: parentEl,
      //   //  targetEvent: $event,
      //    template:template,
          
      //   controller: DialogController
      //  })
       function DialogController($scope, $mdDialog,Auth, $state ) {
       
            Auth.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser){
              console.log('hide dialog')
              $mdDialog.hide();
              $state.reload()
            }
          });

       
        // $scope.auth = $firebaseAuth;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }

  };

  return { getUser, isSignedIn ,loginDialog };
};

export default UserFactory;
