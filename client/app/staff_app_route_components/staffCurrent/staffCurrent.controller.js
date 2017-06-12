class StaffCurrentController {
   /* @ngInject */
  constructor(Site, $firebaseArray, $timeout,$filter,$mdMedia) {
    var ctrl = this;
        ctrl.staff = []
        ctrl.avatars = Site.avatars

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
                                         //  Site.getAvatar( user_id)
                                            $timeout()
                                           
                                           
                                            }
                                         },function(error){console.error(error)})  

                 
                                                     
                },function(error){console.error(error)});


        ctrl.photo_size = 20;
        if($mdMedia('xs'))
        ctrl.photo_size = 90;

ctrl.print = print;

function print(size){

      ctrl.photo_size = size;
      $timeout(function(){  window.print();})
     

}


}
}

export default StaffCurrentController;
