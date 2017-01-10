
/* @ngInject */
let SiteFactory = function (Auth, $timeout, $firebaseObject,$mdDialog,$mdMedia) {

  const site = { location_id: null,
                 location : {} ,
                 user: {},
                 showDialog: showDialog,
               

                };

                // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
           
           if(firebaseUser){

             var Ref=  firebase.database().ref('profiles/'+firebaseUser.uid+'/com' )
               site.user.com = $firebaseObject(Ref);
               site.user.id = firebaseUser.uid;
               console.log('we have changed user '+firebaseUser.uid )
            //  $timeout(function(){            })
           }   
          });         
        

        var connectedRef = firebase.database().ref(".info/connected");
             site.presence = $firebaseObject(connectedRef)

   
  function showDialog($event, template) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         clickOutsideToClose:true,
         fullscreen: $mdMedia('xs'),
         template,
         controller: function ($scope, $mdDialog) { $scope.closeDialog = function() { $mdDialog.hide();} }
      });
    }  




  return site
};

export default SiteFactory;
