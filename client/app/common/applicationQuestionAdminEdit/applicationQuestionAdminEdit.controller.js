class ApplicationQuestionAdminEditController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        ctrl.$onInit = onInit 
        ctrl.save = save

        function onInit(){
        console.log(ctrl.questionId)
        
        ctrl.ref = firebase.database().ref('questions_for_applications').child(ctrl.questionId)
        ctrl.ref.on('value',function(snap){
          ctrl.question = snap.val()
        })
      }

      function save(){
          ctrl.ref.set(ctrl.question)

      }


  }
}

export default ApplicationQuestionAdminEditController;
