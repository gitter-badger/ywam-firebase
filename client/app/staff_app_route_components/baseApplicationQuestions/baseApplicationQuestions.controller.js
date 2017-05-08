class BaseApplicationQuestionsController {
   /* @ngInject */
  constructor(Site, $timeout, $firebaseObject, $scope) 
  {
    var ctrl = this
        ctrl.editQuestion = editQuestion

    var Ref = firebase.database().ref('questions_for_applications') 
        Ref.on('value',function(snap){
          ctrl.questions = snap.val()
        })   

        var defaultRef = firebase.database().ref('location/default_school_questions') 
        $firebaseObject(defaultRef).$bindTo($scope,'default_school_questions')
       

        var staffAppRef = firebase.database().ref('location_public/staff_application_questions') 
        $firebaseObject(staffAppRef).$bindTo($scope,'staff_questions')
        

        function editQuestion($event,question_id  ) {
            console.log(question_id)
            
//            if(question_id==undefined || question_id=="undefined")
//                question_id=null;
            
            var template=
                 
                  '  <application-question-admin-edit question-id="' +  question_id + '" ></application-question-admin-edit>';
                 
              Site.showDialog($event, template)
              console.log(template)
            ctrl.questionIdForm=null;
      }  
        
  }
}

export default BaseApplicationQuestionsController;
