class BaseProjectsController {
    /* @ngInject */
  constructor($firebaseArray, Site, $firebaseObject) {
    var ctrl = this;
        ctrl.editTask = editTask

    var Ref = firebase.database().ref('location/projects')
        ctrl.projects = $firebaseArray(Ref)

      var FundRef = firebase.database().ref('location/funds')
        ctrl.funds = $firebaseObject(FundRef)    
 




 function editTask($event, projectId ,taskId  ) {

     var template=
           '<md-dialog aria-label="dialog"> <md-dialog-content >'+
           '  <base-project-task-edit task-id="' + 
              taskId + '" project-id="' + projectId + '"  ></base-project-task-edit>'+
           '  </md-dialog-content><md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog </md-button> </md-dialog-actions></md-dialog>';

      Site.showDialog($event, template)

      console.log(template)
      
    }  








 }
}

export default BaseProjectsController;
