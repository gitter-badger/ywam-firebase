class BaseProjectTaskEditController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this
        ctrl.save = save

       // console.log(ctrl.projectId)
         console.log(ctrl)

    var Ref = firebase.database().ref('locations/'+Site.location_id+'/projects/'+ctrl.projectId+'/tasks')

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
