
/* @ngInject */
let SiteFactory = function (Auth, $timeout, $firebaseObject,$mdDialog,$mdMedia) {

  const site = { location_id: null,
                 location : {} ,
                 user: {},
                 showDialog: showDialog,
                 getAvatar: getAvatar,
                 avatars: {}
               

                };

                // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
           
           if(firebaseUser){

             var Ref=  firebase.database().ref('profiles/'+firebaseUser.uid+'/com' )
               site.user.com = $firebaseObject(Ref);
               site.user.id = firebaseUser.uid;
               console.log('Current user is: '+firebaseUser.uid )

              //  getAvatar(site.user.id)  


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



    function getAvatar(user_id){
      //once Angular Fire supports Storage https://github.com/firebase/angularfire/issues/785
          //this can be changed till then:
         

       if(user_id){
              firebase.database().ref('/profiles/'+ user_id +'/com').once('value',function(snap){
                var com = snap.val()
                
            if(com){
             
              if(com.avatar_200.includes("http")){
                site.avatars[user_id] = com.avatar_200 
           //     console.log('no gs avatar')
              }else {//else get firebase file

            firebase.storage().refFromURL(com.avatar_200)
              .getDownloadURL().then(function(url){
               

                site.avatars[user_id] = url 
                $timeout(function(){})
                }).catch(function(error){console.log('not valid file'+error)})
            }


              }

              
              
            
              

              })

            
       } 
    } 




  return site
};

export default SiteFactory;
