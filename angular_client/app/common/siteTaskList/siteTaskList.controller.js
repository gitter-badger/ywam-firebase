class SiteTaskListController {
  /* @ngInject */
  constructor($firebaseArray, $timeout) {
   var ctrl = this;

    var RefTasks =  firebase.database().ref('system/tasks')
     var Ref =  firebase.database().ref('system').child('stats')
         Ref.on('value',function(snap){
          ctrl.stats = snap.val()

    })
     
    ctrl.tasks = $firebaseArray(RefTasks)
    

  }
}

export default SiteTaskListController;
