class RoleCallsListController {
   /* @ngInject */
  constructor($firebaseArray) {
    var ctrl = this
        ctrl.newRoleCall = newRoleCall

ctrl.$onInit = function(){

    if(ctrl.schoolId){
      console.log('Role call list for a school, everybody'+ ctrl.schoolId)
// .orderByChild('for/school_id').equalTo("38").on(
      var Ref = firebase.database().ref('role_calls').orderByChild("school_id").equalTo(ctrl.schoolId)

              ctrl.role_calls =  $firebaseArray(Ref)
              

           

    }
    if(ctrl.groupId){
      console.log('Role call list for a group, everybody')

    }


   }//end on init
   


    function newRoleCall(){
        if(ctrl.schoolId){


           var data = {school_id: ctrl.schoolId,
                      name: 'role call for school',
                      time: firebase.database.ServerValue.TIMESTAMP,
                      } 

         var newKey =  firebase.database().ref('role_calls').push(data).key
              console.log(newKey)
          //get list of arrived students
          //TODO filter to get only status arrived
           var apps_ref =   firebase.database().ref('schools').child(ctrl.schoolId).child('app_index')

               apps_ref.on('child_added',function(snap){
                   console.log('maybe'+snap.val())
                 //now we have the app ID we need the user ID
                 if(snap.val() == '30'){
                 console.log('added'+snap.key)
                  firebase.database().ref('applications').child(snap.key).child('for/user_id')
                  .once('value',function(snap){
                    var user_id = snap.val()
                    console.log(user_id)
                    if(user_id){
                     firebase.database().ref('profiles').child(user_id).child('contact').once('value', function(snap){
                     //add user to members list for RoleCall 
                     var user = snap.val()
                     var data = {name:user.first_name + ' '+user.last_name }
                     firebase.database().ref('role_calls').child(newKey).child('members').child(user_id).set(data)
                

                     })
                    }//end if
                   
                
                })
                  }//end if 30
               })

          

          }
        if(ctrl.groupId){
          console.log('Role call list for a group, everybody')

        }
    }

  }
}

export default RoleCallsListController;
