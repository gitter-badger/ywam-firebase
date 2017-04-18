class SchoolQuestionsController {
   /* @ngInject */
  constructor($firebaseObject,$translate,$scope, Site ) {
    var ctrl = this;
        ctrl.$onInit=onInit;
       function onInit(){
            ctrl.site = Site

      var answersRef= firebase.database().ref('applications/'+ctrl.appId+'/answers_to_questions')
         $firebaseObject(answersRef).$bindTo($scope, "answers");
      var schoolRef= firebase.database().ref('schools/'+ctrl.schoolId+'/public/questions_index')
          ctrl.school_questions= $firebaseObject(schoolRef)
           
      var questionsRef = firebase.database().ref('questions_for_applications')  
          ctrl.questions = $firebaseObject(questionsRef)

           $scope.$watch('QuestionsForm.$valid',function(v){
                ctrl.isValid = $scope.QuestionsForm.$valid
            })
           }
      
  }
}

export default SchoolQuestionsController;
