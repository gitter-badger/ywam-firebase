import editStaffDialog from './editStaffDialog.html';

class SchoolStaffController {
   /* @ngInject */
  constructor($stateParams, School, $mdDialog, Site) {
    var ctrl = this;
    var school_id = $stateParams.school_id;
    ctrl.staffs =  School.getStaffRoles(school_id)
  
    // ctrl.avatars = Site.avatars

    ctrl.editStaff = editStaff
   
    function editStaff(key){//Edit staff
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         clickOutsideToClose: true,
         escapeToClose: true,
         template: editStaffDialog,
        //  locals: {
        //    items: $scope.items
        //  },
         controller: DialogController
      });
      function DialogController($scope, $mdDialog, Site, $timeout, $filter) {
        $scope.staff = []
        $scope.key= key;

        //if we are editing an existing role
        if(key){
            var RoleRef = firebase.database().ref('/schools/'+school_id +'/roles/'+key)
                RoleRef.once('value',function(snap){
                  $scope.roles = snap.val()
                })

        }else{// this is a new role get list of all staff

       // get the current staff list
          var Ref = firebase.database().ref('location').child('current_staff_index')
              Ref.on('child_added', function(snap) {
                console.log(snap.key)
     
                      var user_id = snap.key
                          console.log('UserID: ',user_id)

                          firebase.database().ref('/profiles/'+ user_id +'/contact' )
                                         .once('value',function(snapshot) { 
                                            if(snapshot.val() != null){
                                            
                                          $timeout(function() {  
                                            var data = {name:snapshot.val().first_name +' '+snapshot.val().last_name,
                                                      id: user_id } 
                                               
                                        
                                          $scope.staff.push(data);
                                            });
                                            }
                                         },function(error){console.error(error)})                    
                },function(error){console.error(error)});
       
             }//end if new role 


         $scope.getMatches = function (searchText){
           
          // console.log(searchText)
           return $filter('filter')($scope.staff, searchText);

         }  

         $scope.selectedItemChange = function(item){
           $scope.selectedItem= item.id
         }

         $scope.save= function(){
         console.log($scope.selectedItem)
           if(!$scope.key )
              $scope.key = $scope.selectedItem

            var staffIndexRef = firebase.database().ref('/schools/'+school_id +'/roles')
                staffIndexRef.child($scope.key ).set($scope.roles)
                 $mdDialog.hide();
         }     
        $scope.remove = function(user_id){
       var staffIndexRef = firebase.database().ref('/schools/'+school_id +'/roles/')
                staffIndexRef.child(user_id ).remove()
                  $mdDialog.hide();
    } 

        // $scope.items = items;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }


    }
    



    }


  }
}

export default SchoolStaffController;
