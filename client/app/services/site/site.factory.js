
/* @ngInject */
let SiteFactory = function (Auth, $timeout, $firebaseObject,$mdDialog,$mdMedia, $state,moment,localStorageService) {

  const site = { location_id: null,
                 location : {} ,
                 user: {},
                 showDialog: showDialog,
                 inWeeks : inWeeks,
                 language:null,
                 hideSideNav : true,
                 isStaff :false,
                 hideDialog: hideDialog, 
                 user_roles : {},
                 client_id:null,  //Client Tracking

               

                };


        // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
           
           if(firebaseUser){

            site.firebaseUser = firebaseUser;
            site.user.id = firebaseUser.uid;
            
            firebase.database().ref('profiles/'+firebaseUser.uid+'/contact' )
              .once('value').then(function(snap){
               if(snap.val()){
               site.user.contact= snap.val()
               console.log('Current user is: '+firebaseUser.uid )
              }//if data
              })

              firebase.database().ref('profiles/'+firebaseUser.uid+'/app_index' )
              .once('value').then(function(snap){
               if(snap.val() && $state.current.name=='apply.schoolList' ){
                 console.log($state.current.name)
              console.log('already has applications started, taking them to dashboard')
                $state.go('apply.dashboard')
              }//if data
              })

              firebase.database().ref('location/current_staff_index').child(site.user.id)
              .once('value',function(snap){
               console.log('current user is a staff? '+ snap.val())
                if(snap.val()){
                   site.hideSideNav = false
                   site.isStaff = true
                }
              })

              firebase.database().ref('site_roles/')
              .once('value',function(snap){
               snap.forEach(function(role){
                 role.forEach(function(item){
                   if(item.key == site.user.id)
                   site.user_roles[role.key] = true
                 })
               })
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
         template :   '<md-dialog aria-label="dialog"> <md-dialog-content style="padding:15px">'+
                        template +
                      '  </md-dialog-content></md-dialog>',
         controller: function ($scope, $mdDialog) { $scope.closeDialog = function() { $mdDialog.hide();} }
      });
    }

    function hideDialog(){
      $mdDialog.hide()
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
