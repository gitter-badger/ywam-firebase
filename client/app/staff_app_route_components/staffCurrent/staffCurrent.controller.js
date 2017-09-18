class StaffCurrentController {
   /* @ngInject */
  constructor(Site, $firebaseArray, $timeout,$filter,$mdMedia, $scope) {
    var ctrl = this;
        ctrl.staff = []

    var Ref = firebase.database().ref('location').child('current_staff_index')

        Ref.on('child_added', function(snap) {
        //   console.log(snap.key)
     
                      var user_id = snap.key
                        //   console.log('UserID: ',user_id)

                          firebase.database().ref('/profiles/'+ user_id +'/contact' )
                                         .on('value',function(snapshot) { 
                                            
                                            if(snapshot.val() != null){


                                         
                                            var data = snapshot.val()
                                                data.id = user_id;

                                           var index =  ctrl.staff.push(data);
                                            $timeout()
                                           
                                           
                                            }
                                         },function(error){console.error(error)})  

                 
                                                     
                },function(error){console.error(error)});

        // ctrl.photo_size = $mdMedia        
        // if($mdMedia('xs'))
        // ctrl.photo_size = '50%';
        // if($mdMedia('sm'))        
        // ctrl.photo_size = '25%';
        // if($mdMedia('gt-md'))
        // ctrl.photo_size = '15%';

ctrl.print = print;

function print(print_class){

      ctrl.print_class= print_class
      $timeout(function(){  window.print();})
     

}


}
}

export default StaffCurrentController;
