class StaffGroupsController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'staffGroups';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.staffGroups = snap.val()
        // })
  }
}

export default StaffGroupsController;
