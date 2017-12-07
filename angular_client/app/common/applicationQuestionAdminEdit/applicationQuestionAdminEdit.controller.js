class ApplicationQuestionAdminEditController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.$onInit = onInit 
        ctrl.save = save
     
          
   
      
        function onInit(){
          ctrl.question_id=false
            
            console.log(ctrl.questionId)
      
   if(ctrl.questionId!=undefined && ctrl.questionId !== 'undefined' ){
     ctrl.question_id = ctrl.questionId;
     
   }
          
      
        console.log(ctrl.question_id)
      
        
        ctrl.ref = firebase.database().ref('questions_for_applications')
            if(ctrl.question_id ){
                console.log('loading question from DB')
                    ctrl.ref.child(ctrl.question_id).on('value',function(snap){
            
                        ctrl.question = snap.val()
        })}
            else {
                 console.log('new question')
                ctrl.question ={active:true};
            }
      }

      function save(){
        if(ctrl.question_id){
          ctrl.ref.child(ctrl.question_id).set(ctrl.question)
        }
          else{
              ctrl.ref.push(ctrl.question)
          }
          
          Site.hideDialog();
      }

      

  }
}

export default ApplicationQuestionAdminEditController;
