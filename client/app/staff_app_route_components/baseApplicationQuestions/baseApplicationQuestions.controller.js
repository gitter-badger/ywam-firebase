class BaseApplicationQuestionsController {
   /* @ngInject */
  constructor(Site, $timeout, $firebaseObject, $scope) 
  {
    var ctrl = this

    var Ref = firebase.database().ref('questions_for_applications') 
        Ref.on('value',function(snap){
          ctrl.questions = snap.val()
        })   

        var defaultRef = firebase.database().ref('location/default_school_questions') 
        $firebaseObject(defaultRef).$bindTo($scope,'default_school_questions')
       

        var staffAppRef = firebase.database().ref('location_public/staff_application_questions') 
        $firebaseObject(staffAppRef).$bindTo($scope,'staff_questions')
        
        
  }
}

export default BaseApplicationQuestionsController;
