class ApplicationController {
  /* @ngInject */
  constructor($stateParams,$firebaseObject,$scope,Auth, moment,Site) {
     
    var user_id =   Auth.$getAuth().uid; 
    var ctrl = this;
    var now = new Date();
    
        ctrl.app_id = $stateParams.appId;
        ctrl.maxDate = new Date( new Date().setFullYear( now.getFullYear() - 15) )
        ctrl.minDate = new Date( new Date().setFullYear( now.getFullYear() - 100) )
        ctrl.submit = submit;
        ctrl.changeDOB = changeDOB

      ctrl.update = (refs)=>{
        console.log('update now' + refs)
       
            
            $scope.profile.$save().then(function(ref) {
               console.log('Saved '+ ref.key)
              //  ref.key === obj.$id; // true
              }, function(error) {
                console.log("Error:", error);
              });

      }

     var profile_contact_ref =   firebase.database().ref('/profiles/' +user_id+'/contact' );
         $firebaseObject(profile_contact_ref).$bindTo($scope, "profile_contact");
         profile_contact_ref.once('value', (snap)=>{
          if(snap.val().dob)
          ctrl.dob =  new Date( snap.val().dob)
         })
    
    
     var app_for_ref =   firebase.database().ref('/applications/' +ctrl.app_id + '/for');
      $firebaseObject(app_for_ref).$bindTo($scope, "app_for");
    
    var app_private_ref =   firebase.database().ref('/applications/' +ctrl.app_id + '/private');
      $firebaseObject(app_private_ref).$bindTo($scope, "app_private");
      

     
      app_for_ref.on('value', function(snapshot) {
          var app = snapshot.val();


          if(app.school_id){
              ctrl.school_id=app.school_id;
              var school_ref =   firebase.database().ref('/schools/'+ app.school_id+ '/public/');
              ctrl.school = $firebaseObject(school_ref);    
          }
     })

    

     function submit(){

       console.log('submiting')
       firebase.database().ref('/applications/' +ctrl.app_id + '/requests/submit').set(true);
     }


     function changeDOB(){
        $scope.profile_contact.dob = moment(ctrl.dob).format("YYYY-MM-DD");
         console.log('changeDOB ' +  $scope.profile_contact.dob)
     }




 var app_admin_notes_ref =   firebase.database().ref('/applications/' +ctrl.app_id + '/admin_notes');
     app_admin_notes_ref.once('value').then(()=>{console.warn('applicant can access admin_notes node')},
                                          ()=>{ })



  }
}

export default ApplicationController;
