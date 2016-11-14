class RoleCallMemberListController {
    /* @ngInject */
  constructor( $firebaseArray) {
   var ctrl = this  
       ctrl.setHere = setHere
       ctrl.filterList = filterList
       

        console.log('working with role call #' + ctrl.roleCallId)
        var roleCall_ref = firebase.database().ref('role_calls').child(ctrl.roleCallId).child('members')

         ctrl.members = $firebaseArray(roleCall_ref)



        function setHere(key){

          console.log('setting here'+key)
         roleCall_ref.child(key).child('present').set(true);

        }

         function filterList(item){
          var show = false;
         if(item.present)
           show =  true;
          return show;
        };

  }
}

export default RoleCallMemberListController;
