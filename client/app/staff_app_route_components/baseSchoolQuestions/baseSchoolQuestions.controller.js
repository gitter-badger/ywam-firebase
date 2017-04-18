class BaseSchoolQuestionsController 
/* @ngInject */
{
  constructor(Site, $timeout) 
  {
    var ctrl = this

    var Ref = firebase.database().ref('questions_for_applications') 
        Ref.on('value',function(snap){
          ctrl.questions = snap.val()
        })   

        var defaultRef = firebase.database().ref('location/default_school_questions') 
        defaultRef.on('value',function(snap){
         
          ctrl.default_questions = snap.val()
          $timeout()
        })  
        
  }
}

export default BaseSchoolQuestionsController;
