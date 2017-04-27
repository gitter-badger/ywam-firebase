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
            var template=
                  '<md-dialog aria-label="dialog"> <md-dialog-content >'+
                  '  <application-question-admin-edit question-id="' +  question_id + '" ></application-question-admin-edit>'+
                  '  </md-dialog-content><md-dialog-actions>' +
                  '    <md-button ng-click="closeDialog()" class="md-primary">' +
                  '      Close Dialog </md-button> </md-dialog-actions></md-dialog>';
              Site.showDialog($event, template)
              console.log(template)
      }  
        
  }
}

export default BaseApplicationQuestionsController;
