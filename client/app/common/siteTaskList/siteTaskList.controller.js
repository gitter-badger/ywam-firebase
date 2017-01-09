class SiteTaskListController {
  /* @ngInject */
  constructor($firebaseArray) {
   var ctrl = this;

     var Ref =  firebase.database().ref('system/tasks')

     ctrl.tasks = $firebaseArray(Ref)

  }
}

export default SiteTaskListController;
