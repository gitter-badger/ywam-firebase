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

          snap.forEach(function(group){
          // console.log(group.val())
          angular.forEach(group.val().members, function(item,key){
             
  
              firebase.database().ref('/profiles/'+key+'/contact/avatar_200').once('value',function(snap){
                ctrl.groups[group.key].members[key].avatar = snap.val()
                // console.log(ctrl.groups[group.key].members[key].avatar)
                $timeout()
              })
  
            })//end for each member
        })//end foreach group
        })
        
        function newGroupDialog($event){
          var template =`<group-edit-dialog></group-edit-dialog>`;
          Site.showDialog($event, template )
        }



  }
}

export default StaffGroupsController;
