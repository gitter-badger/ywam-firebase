class BasePermissionsController {
/* @ngInject */
  constructor(Site,$timeout) {
  
    var ctrl = this; 
        ctrl.perms= {};
        ctrl.addDialog = addDialog
        ctrl.remove = remove
        ctrl.site = Site
    var Ref  =  firebase.database().ref('site_roles');

        Ref.on('child_added', function(snap){ 

               ctrl.perms[snap.key] = {}
                         
                     angular.forEach(snap.val(), function(value, key){    

                        var user_id = key
                        console.log('UserID: ',user_id)   

                          firebase.database().ref('/profiles/'+ user_id +'/contact' )
                                         .on('value',function(snapshot) { 
                                            
                                            if(snapshot.val() != null){
                                            
                                            //  var item =  $filter('filter')(ctrl.staff, {id: snapshot.key}, true);
                                            // var index = ctrl.staff.indexOf(item[0])
                                         

                                          $timeout(function() {  
                                            var data = snapshot.val()
                                                data.id = snapshot.key;
                                          //  if(index >-1)    
                                          //  ctrl.staff[index] =data;
                                          //  else
                                          
                                           ctrl.perms[snap.key][user_id]  = data; 
                                         
                                            // trigger $digest/$apply so Angular syncs the DOM
                                           
                                            });
                                            }
                                         },function(error){console.error(error)})  

                     })               
                                                     
                },function(error){console.error(error)});

     function addDialog($event, permission_id){

      var template = `<base-permissions-add-dialog permission-id="'${permission_id}'"></base-permissions-add-dialog>`
      // console.log(template)
       Site.showDialog($event, template)
     }

     function remove(permission_id, user_id){
       console.log('removing'+ user_id , permission_id)
        firebase.database().ref('/site_roles/'+permission_id +'/'+user_id).remove()
     }

  }
}

export default BasePermissionsController;
