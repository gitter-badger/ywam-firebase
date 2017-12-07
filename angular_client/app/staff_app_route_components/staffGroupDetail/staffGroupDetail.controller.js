class StaffGroupDetailController {
   /* @ngInject */
  constructor($stateParams,Site, $timeout) {
    var ctrl = this;
        ctrl.newMemberDialog = newMemberDialog
        ctrl.removeMember = removeMember
        ctrl.editGroup = editGroup
        ctrl.group_id = $stateParams.group_id

        var Ref = firebase.database().ref('/location/staff_groups/'+ctrl.group_id)
        Ref.on('value',function(snap){
          ctrl.staffGroup = snap.val()
          
          angular.forEach(ctrl.staffGroup.members, function(item,key){
          //  console.log(key)

            firebase.database().ref('/crm/'+key+'/name').once('value',function(snap){
              ctrl.staffGroup.members[key].name = snap.val()
              
              firebase.database().ref('/profiles/'+key+'/contact/avatar_200').once('value',function(snap){
                ctrl.staffGroup.members[key].avatar = snap.val()
                // console.log(ctrl.groups[group.key].members[key].avatar)
                $timeout()
              })
              
            })

          })

          $timeout()
        })
        function newMemberDialog($event){
          var template =`<staff-group-add-member-dialog group-id="${ctrl.group_id}"></staff-group-add-member-dialog>`;
          Site.showDialog($event, template )
        }

        function removeMember(member_id){
          firebase.database().ref('/location/staff_groups/'+ctrl.group_id+'/members/'+member_id).remove()
        }
        function editGroup($event){
          var template =`<group-edit-dialog group-id="${ctrl.group_id}"></group-edit-dialog>`;
          Site.showDialog($event, template )
        }
  }
}

export default StaffGroupDetailController;
