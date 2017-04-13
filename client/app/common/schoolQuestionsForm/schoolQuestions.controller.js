class SchoolQuestionsController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        ctrl.$onInit=onInit;
       function onInit(){
      var Ref= firebase.database().ref('applications/'+ctrl.appId+'/answers_to_questions')
      var schoolRef= firebase.database().ref('schools/'+ctrl.schoolId+'/public/questions_index')
      schoolRef.on('value',function(snap){
          ctrl.questions=snap.val()
      })
           }
      console.log(ctrl.schoolId);
  }
}

export default SchoolQuestionsController;
