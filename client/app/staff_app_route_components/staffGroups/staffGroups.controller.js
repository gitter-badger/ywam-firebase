class StaffGroupsController {
   /* @ngInject */
  constructor($mdMedia, Site, $stateParams, $timeout) {
    var ctrl = this;
        ctrl.isMobile = $mdMedia('xs')
        ctrl.newGroupDialog = newGroupDialog
        // ctrl.addMemberDialog = addMemberDialog
        ctrl.stateParams=$stateParams

        var Ref = firebase.database().ref('/location/staff_groups')
        Ref.on('value',function(snap){
          ctrl.groups = snap.val()
          $timeout()
        })

        
        function newGroupDialog($event){
          var template =`<group-edit-dialog></group-edit-dialog>`;
          Site.showDialog($event, template )
        }



  }
}

export default StaffGroupsController;
