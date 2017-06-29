class BasePermissionsAddDialogController {
   /* @ngInject */
  constructor($filter, $timeout, Site) {
    var ctrl = this;
        ctrl.getMatches = getMatches
        ctrl.selectedItemChange = selectedItemChange
  
        ctrl.staff=[]

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
       

        function getMatches(searchText){
           
          // console.log(searchText)
           return $filter('filter')(ctrl.staff, searchText);

         }  

         function selectedItemChange(item){
          
          console.log(item)
            firebase.database().ref('/site_roles/'+ctrl.permissionId +'/'+item.id).set(true)
               
                 Site.hideDialog();
         }     
        

  }
}

export default BasePermissionsAddDialogController;
