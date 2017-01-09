
/* @ngInject */
let SiteFactory = function (Auth, $timeout, $firebaseObject) {

  const site = { location_id: null,
                 location : {} ,
                 user: {},
               

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

   
  




  return site
};

export default SiteFactory;
