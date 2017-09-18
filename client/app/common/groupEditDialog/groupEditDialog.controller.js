class GroupEditDialogController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.save = save;

        var Ref = firebase.database().ref('/location/staff_groups')
        // Ref.on('value',function(snap){
        //   ctrl.groupEditDialog = snap.val()
        // })



       function save(){
        if(ctrl.groupId){
          Ref.child(ctrl.groupId).update(ctrl.group)
       }
      if(!ctrl.groupId){
         Ref.push(ctrl.group)
      }
        
         Site.hideDialog()
      }

  }
}

export default GroupEditDialogController;
