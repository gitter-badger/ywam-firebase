class ApplicationController {
  /* @ngInject */
  constructor($stateParams,$firebaseObject,$scope,Auth, moment,Site,$state) {
        Site.hideSideNav = true
   
    var ctrl = this;
    var now = new Date();
        ctrl.user_id =   Auth.$getAuth().uid; 
        ctrl.app_id = $stateParams.appId;
        ctrl.maxDate = new Date( new Date().setFullYear( now.getFullYear() - 15) )
        ctrl.minDate = new Date( new Date().setFullYear( now.getFullYear() - 100) )
        ctrl.submit = submit;
//        ctrl.changeDOB = changeDOB

      ctrl.update = (refs)=>{
        console.log('update now' + refs)
       
            
            $scope.profile.$save().then(function(ref) {
               console.log('Saved '+ ref.key)
              //  ref.key === obj.$id; // true
              }, function(error) {
                console.log("Error:", error);
              });

      }

     var profile_contact_ref =   firebase.database().ref('/profiles/' +ctrl.user_id+'/contact' );
         $firebaseObject(profile_contact_ref).$bindTo($scope, "profile_contact");
         profile_contact_ref.once('value', (snap)=>{
          if(snap.val().dob)
          ctrl.dob =  moment( snap.val().dob)
         })
    
    
     var app_for_ref =   firebase.database().ref('/applications/' +ctrl.app_id + '/for');
      // $firebaseObject(app_for_ref).$bindTo($scope, "app_for");
    
    var app_private_ref =   firebase.database().ref('/applications/' +ctrl.app_id + '/private');
      $firebaseObject(app_private_ref).$bindTo($scope, "app_private");
      

     
      app_for_ref.on('value', function(snapshot) {
          
          ctrl.app_for = snapshot.val();

          if(ctrl.app_for.school_id){
              ctrl.school_id=ctrl.app_for.school_id;
              var school_ref =   firebase.database().ref('/schools/'+ ctrl.app_for.school_id+ '/public/');
              ctrl.school = $firebaseObject(school_ref);    
          }
     })

    

     function submit(){
 
      angular.forEach(ctrl.forms, function(item,key){
        console.log(key,item)
      })
      
       console.log('submiting')
       firebase.database().ref('/applications/' +ctrl.app_id + '/requests/submit').set(true);
       $state.go('apply.dashboard')

     }


//     function changeDOB(){
//        $scope.profile_contact.dob = moment(ctrl.dob).format("YYYY-MM-DD");
//         console.log('changeDOB ' +  $scope.profile_contact.dob)
//     }
//



 var app_admin_notes_ref =   firebase.database().ref('/applications/' +ctrl.app_id + '/admin_notes');
     app_admin_notes_ref.once('value').then(()=>{console.warn('applicant can access admin_notes node')},
                                          ()=>{ })



  }
}

export default ApplicationController;
