class SiteTaskListController {
  /* @ngInject */
  constructor($firebaseArray) {
   var ctrl = this;

     var Ref =  firebase.database().ref('system/tasks')
        //  Ref.on('value',function(snap){

        // ctrl.task_count=   snap.numChilderen()
        //  })

     ctrl.tasks = $firebaseArray(Ref)
    

  }
}

export default SiteTaskListController;
