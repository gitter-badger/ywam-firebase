import editStaffDialog from './editStaffDialog.html';

class SchoolStaffController {
   /* @ngInject */
  constructor($stateParams, School, $mdDialog, Site) {
    var ctrl = this;
    var school_id = $stateParams.school_id;
    ctrl.staffs =  School.getStaff(school_id)
    ctrl.admins =  School.getAdmins(school_id)
    ctrl.avatars = Site.avatars

    ctrl.addStaff = addStaff
    ctrl.remove = remove

    function remove(type, key){
      console.log(key)
      console.log(type)
       var staffIndexRef = firebase.database().ref('/schools/'+school_id +'/'+type)
                staffIndexRef.child(key ).remove()



    }

    function addStaff(type){
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
        $scope.type= type;
       // get the current staff 
          var Ref = firebase.database().ref('locations/'+Site.location_id).child('current_staff_index')
              Ref.on('child_added', function(snap) {
                console.log(snap.key)
     
                      var user_id = snap.key
                          console.log('UserID: ',user_id)

                          firebase.database().ref('/profiles/'+ user_id +'/com' )
                                         .on('value',function(snapshot) { 
                                            if(snapshot.val() != null){
                                            
                                          $timeout(function() {  
                                            var data = snapshot.val()
                                                data.id = user_id;
                                        
                                          $scope.staff.push(data);
                                            });
                                            }
                                         },function(error){console.error(error)})                    
                },function(error){console.error(error)});
       
         $scope.getMatches = function (searchText){
           
          // console.log(searchText)
           return $filter('filter')($scope.staff, searchText);

         }  

         $scope.addStaff= function(){
           console.log($scope.selectedItem.id)
            var staffIndexRef = firebase.database().ref('/schools/'+school_id +'/'+type)
                staffIndexRef.child($scope.selectedItem.id ).set(true)
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
