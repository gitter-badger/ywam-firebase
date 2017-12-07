class StaffGroupAddMemberDialogController {
   /* @ngInject */
  constructor($filter, $timeout,$mdDialog ,$window) {
    var ctrl = this;

         ctrl.staff = []



         
          //if we are editing an existing role
          // if(key){
          //     var RoleRef = firebase.database().ref('/schools/'+school_id +'/roles/'+key)
          //         RoleRef.once('value',function(snap){
          //           ctrl.roles = snap.val()
          //         })
  
          // }else{// this is a new role get list of all staff
  
         // get the current staff list
            var Ref = firebase.database().ref('location').child('current_staff_index')
                Ref.on('child_added', function(snap) {
                  // console.log(snap.key)
       
                        var user_id = snap.key
                            // console.log('UserID: ',user_id)
  
                            firebase.database().ref('/profiles/'+ user_id +'/contact' )
                                           .once('value',function(snapshot) { 
                                              if(snapshot.val() != null){
                                              
                                            $timeout(function() {  
                                              var data = {name:snapshot.val().first_name +' '+snapshot.val().last_name,
                                                            id: user_id } 
                                                 
                                          
                                            ctrl.staff.push(data);
                                              });
                                              }
                                           },function(error){console.error(error)})                    
                  },function(error){console.error(error)});
         
              //  }//end if new role 
  
  
           ctrl.getMatches = function (searchText){
             
            // console.log(searchText)
             return $filter('filter')(ctrl.staff, searchText);
  
           }  
  
           ctrl.selectedItemChange = function(item){
             ctrl.selectedItem= item.id
           }
  
           ctrl.save= function(){
           console.log(ctrl.groupId)
            
                ctrl.user_id = ctrl.selectedItem
  
              var groupRef = firebase.database().ref('/location/staff_groups/'+ctrl.groupId+'/members')
                  groupRef.child(ctrl.user_id ).set({ created: firebase.database.ServerValue.TIMESTAMP,
                                                      is_leader: ctrl.is_leader || null})
                   $mdDialog.hide();
           }     
     
          ctrl.closeDialog = function() {
            $mdDialog.hide();
          }
  

  }
}

export default StaffGroupAddMemberDialogController;
