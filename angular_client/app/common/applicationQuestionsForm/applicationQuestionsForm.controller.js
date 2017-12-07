class ApplicationQuestionsFormController {
   /* @ngInject */
  constructor($firebaseObject,$translate,$scope, Site, $firebaseArray ) {
    var ctrl = this;
        ctrl.$onInit=onInit;
       function onInit(){
            ctrl.site = Site

            // console.log('ApplicationQuestionsFormController: '+ctrl.appType)
            //  console.log('ApplicationQuestionsFormController: '+ctrl.schoolId)

      var answersRef= firebase.database().ref('applications/'+ctrl.appId+'/answers_to_questions')
         $firebaseObject(answersRef).$bindTo($scope, "answers");

      if(ctrl.schoolId){   
          
      var schoolRef= firebase.database().ref('schools/'+ctrl.schoolId+'/public/questions_index')
          ctrl.questions_index= $firebaseArray(schoolRef)
      }
      if(ctrl.appType !='school'){   
      var qRef= firebase.database().ref('location_public/application_types/'+ctrl.appType +'/questions')
          ctrl.questions_index= $firebaseArray(qRef)
      }

           
      var questionsRef = firebase.database().ref('questions_for_applications')  
          ctrl.questions = $firebaseObject(questionsRef)

           $scope.$watch('QuestionsForm.$valid',function(v){
                ctrl.isValid = $scope.QuestionsForm.$valid
            })
           }
      
  }
}

export default ApplicationQuestionsFormController;
