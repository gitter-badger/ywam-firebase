
/* @ngInject */
let SiteFactory = function (Auth, $timeout, $firebaseObject) {

  const site = { location_id: null,
                 user: {}

                };

                // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
           
           if(firebaseUser){

             var Ref=  firebase.database().ref('profiles/'+firebaseUser.uid+'/com' )
               site.user.com = $firebaseObject(Ref);
               site.user.id = firebaseUser.uid;
               console.log('we have changed user'+firebaseUser.uid )
            //  $timeout(function(){            })
           }   
          });         
        

        var connectedRef = firebase.database().ref(".info/connected");
             site.presence = $firebaseObject(connectedRef)
             
              // connectedRef.on("value", function(snap) {
              //   console.log(snap.val())
              //   if (snap.val() === true) {
              //     site.presence = "connected";
                   
              //   } else {
              //     site.presence ="not connected";
                 
              //   }
              //    $timeout(function(){            })
              // });


  return site
};

export default SiteFactory;
