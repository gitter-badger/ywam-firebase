class ContactInfoFormController {
   /* @ngInject */
  constructor(Auth,$stateParams,$firebaseObject,$scope, moment,Site,$state,$timeout) {
    var ctrl = this;
        
        var ctrl = this;
    var now = new Date();
         if(!ctrl.userId)
        ctrl.userId = Auth.$getAuth().uid 
        ctrl.app_id = $stateParams.appId;
        ctrl.maxDate = new Date( new Date().setFullYear( now.getFullYear() - 15) )
        ctrl.minDate = new Date( new Date().setFullYear( now.getFullYear() - 100) )
       
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
      
       $scope.$watch('$ctrl.forms.contact.$valid',function(v){
              ctrl.forms.contact.$valid ? ctrl.isValid = true : ctrl.isValid = false
              $timeout()
           
          })


     var profile_contact_ref =   firebase.database().ref('/profiles/' +ctrl.userId+'/contact' );
         $firebaseObject(profile_contact_ref).$bindTo($scope, "profile_contact");
         profile_contact_ref.once('value', (snap)=>{
          if(snap.val().dob)
          ctrl.dob =  moment( snap.val().dob)
         })
    
      
       function changeDOB(){
        $scope.profile_contact.dob = moment(ctrl.dob).format("YYYY-MM-DD");
         console.log('changeDOB ' +  $scope.profile_contact.dob)
     }



        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.contactInfoForm = snap.val()
        // })
  }
}

export default ContactInfoFormController;
