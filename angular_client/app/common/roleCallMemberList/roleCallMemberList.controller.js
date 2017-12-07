class RoleCallMemberListController {
    /* @ngInject */
  constructor( $firebaseArray, $firebaseObject) {
   var ctrl = this  
       ctrl.setHere = setHere
       ctrl.setNotHere = setNotHere
       ctrl.filterList = filterList
       

       ctrl.$onInit = function(){
       if(ctrl.roleCallId){

        console.log('working with role call #' + ctrl.roleCallId)
        var roleCall_ref = firebase.database().ref('role_calls').child(ctrl.roleCallId).child('members')
        var roleCall_meta = firebase.database().ref('role_calls').child(ctrl.roleCallId).child('time')
       
       roleCall_meta.once('value',function(snap){
         ctrl.time = snap.val()
        })
         ctrl.members = $firebaseArray(roleCall_ref)

         roleCall_ref.on('value',function(snap){
          ctrl.here = 0
          ctrl.not_here = 0
           snap.forEach(function(member){

            if(member.val().present)
            ctrl.here++

             if(member.val().present == false)
            ctrl.not_here++

           })
         })
       


         }

       }//end on init


        function setHere(key){

          console.log('setting here'+key)
        var roleCall_ref = firebase.database().ref('role_calls').child(ctrl.roleCallId).child('members')
         roleCall_ref.child(key).child('present').set(true);

        }

          function setNotHere(key){

          console.log('setting NOT here'+key)
        var roleCall_ref = firebase.database().ref('role_calls').child(ctrl.roleCallId).child('members')
         roleCall_ref.child(key).child('present').set(false);

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
