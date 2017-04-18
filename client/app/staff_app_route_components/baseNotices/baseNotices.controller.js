class BaseNoticesController {
    /* @ngInject */
  constructor(Site, $firebaseObject,$scope, $timeout, Auth) {
    var ctrl = this

    var location_notices_ref = firebase.database().ref('location_public').child('notices')
    
        ctrl.notices =  $firebaseObject(location_notices_ref)//.$bindTo($scope, "notices");
       location_notices_ref.on('value', function(snap){
         var ref = firebase.database().ref('profiles').child(snap.val().lastSaveBy).child('contact')
             ctrl.lastSaveUser = $firebaseObject(ref);
       })
       

         // calling $save() on the synchronized object syncs all data back to our database
    ctrl.save = function() {
       ctrl.notices.$save().then(function() {
         location_notices_ref.child('lastSave').set( firebase.database.ServerValue.TIMESTAMP )
         location_notices_ref.child('lastSaveBy').set( Auth.$getAuth().uid )
        
      }).catch(function(error) {
       // alert('Error!');
      });
    };


    

   }
}

export default BaseNoticesController;
