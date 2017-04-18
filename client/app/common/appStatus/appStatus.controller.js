class AppStatusController {
 /* @ngInject */
  constructor(Auth,$timeout) {
      var ctrl = this;
          ctrl.changeStatus = changeStatus

      ctrl.$onInit = function()
      { 
          var Ref =   firebase.database().ref('/applications/'+ctrl.appId+'/meta')
          Ref.on('value',function(snap){ //Set this as a listener because we want to see it change when we change it!
              ctrl.appMeta = snap.val()

              $timeout(function(){});
              if(ctrl.who){
                var user_id = ctrl.appMeta.statuses[ctrl.appMeta.status].user_id
                if(user_id) {
                var userRef =   firebase.database().ref('/profiles/'+ user_id +'/contact' )
                userRef.once('value', function(snap){
                   if(snap.val()) 
                  ctrl.status_by = snap.val().first_name + ' ' + snap.val().last_name.charAt(0) + '.';
              
                })
                }
              }
            

          })
      }  
          //var 

      function changeStatus(status_num)
      {
            var user_id = Auth.$getAuth().uid;
            console.log(ctrl.appId)
           firebase.database().ref('applications/' +ctrl.appId + '/meta/status').set(status_num);
           firebase.database().ref('applications/' +ctrl.appId + '/meta/statuses/'+status_num +'/date').set(new Date().getTime())
           firebase.database().ref('applications/' +ctrl.appId + '/meta/statuses/'+status_num +'/user_id').set(user_id)

       }

  }
}

export default AppStatusController;
