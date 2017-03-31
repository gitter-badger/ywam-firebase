class BaseSchoolQuestionsController 
/* @ngInject */
{
  constructor() 
  {
    var ctrl = this

    var Ref = firebase.database().ref('questions_for_applications') 
        Ref.on('value',function(snap){
          ctrl.questions = snap.val()
        })   
        
  }
}

export default BaseSchoolQuestionsController;
