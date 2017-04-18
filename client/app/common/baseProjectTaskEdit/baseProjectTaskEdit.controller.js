class BaseProjectTaskEditController {
   /* @ngInject */
  constructor(Site, $firebaseArray) {
    var ctrl = this
        ctrl.save = save

    var fundsRef = firebase.database().ref('location/funds')
        ctrl.funds = $firebaseArray(fundsRef)

    var Ref = firebase.database().ref('location/projects/'+ctrl.projectId+'/tasks')

    if(ctrl.taskId !='undefined'){
        Ref.child(ctrl.taskId).once('value',function(snap){
          ctrl.task = snap.val()
        })
      
    }

    function save(){

      if(ctrl.taskId !='undefined'){
          Ref.child(ctrl.taskId).set(ctrl.task)
          
      }else{
      
         //new task
        var data = ctrl.task
         Ref.push(data);
         
        ctrl.task = {}


      }


    }
  }
}

export default BaseProjectTaskEditController;
