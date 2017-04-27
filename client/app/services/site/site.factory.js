
/* @ngInject */
let SiteFactory = function (Auth, $timeout, $firebaseObject,$mdDialog,$mdMedia, $state,moment) {

  const site = { location_id: null,
                 location : {} ,
                 user: {},
                 showDialog: showDialog,
                 inWeeks : inWeeks,
                 language:null,
                 hideSideNav : true,
                 isStaff :false

               

                };


        // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
           
           if(firebaseUser){

            site.firebaseUser = firebaseUser;
             var Ref=  firebase.database().ref('profiles/'+firebaseUser.uid+'/contact' )

              .once('value').then(function(snap){
               if(snap.val()){
               site.user.contact= snap.val()
              

               
               site.user.id = firebaseUser.uid;
               console.log('Current user is: '+firebaseUser.uid )

               firebase.database().ref('location/current_staff_index').child(site.user.id)
               .once('value',function(snap){//if the logged in user is a current staff take them home!
                console.log('current user is a staff? '+ snap.val())
                
                 if(snap.val()){
                    site.hideSideNav = false
                    site.isStaff = true
                 }
               })
             

              }//if data
              })


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

 var Ref = firebase.database().ref('location_public')
            site.location = $firebaseObject(Ref)



          
           

          function inWeeks(fromDate) {
             var now = moment();
             var toDate = now
             
                var days    = toDate.diff(fromDate, 'days');    
                var weeks   = toDate.diff(fromDate, 'weeks');

                if (weeks === 0) {

                    return   (days < 0 ? 'in ' : '') + Math.abs(days) + ' ' + (Math.abs(days) > 1 ? 'days' : 'day');
               
               } else {

                    return (weeks < 0 ? 'in ' : '')+ Math.abs(weeks) + ' ' + (Math.round(Math.abs(days) / 7) > 1 ? 'weeks' : 'week');
                }

            }

           




  return site
};

export default SiteFactory;
