class StaffCurrentController {
   /* @ngInject */
  constructor(Site, $firebaseArray, $timeout,$filter,$mdMedia) {
    var ctrl = this;
        ctrl.staff = []
        ctrl.avatars = Site.avatars

    var Ref = firebase.database().ref('location').child('current_staff_index')

        Ref.on('child_added', function(snap) {
          console.log(snap.key)
     
                      var user_id = snap.key
                          console.log('UserID: ',user_id)

                          firebase.database().ref('/profiles/'+ user_id +'/contact' )
                                         .on('value',function(snapshot) { 
                                            
                                            if(snapshot.val() != null){


                                         
                                            var data = snapshot.val()
                                                data.id = user_id;

                                           var index =  ctrl.staff.push(data);
                                         //  Site.getAvatar( user_id)
                                           
                                           
                                            }
                                         },function(error){console.error(error)})  

                 
                                                     
                },function(error){console.error(error)});


        ctrl.photo_size = 150;
        if($mdMedia('xs'))
        ctrl.photo_size = 90;

ctrl.print = print;

  function print(size) {
            
                myWindow = window.open(Site.api + '/staff/print_photos/'+size+'/'+ Site.location.id,
                       "_blank");
                myWindow.focus();

            
        }
    // function getAvatar(index){
    //   //once Angular Fire supports Storage https://github.com/firebase/angularfire/issues/785
    //       //this can be changed till then:
    //     var index = index - 1
    //       // console.log(ctrl.staff[index])
    //         var av =   ctrl.staff[index].avatar_200

              
    //           firebase.storage().refFromURL(av)
    //           .getDownloadURL().then(function(url){
    //            $timeout(function(){})
    //            ctrl.staff[index].avatar =  url 
    //             }).catch(function(error){console.log('not valid file')})
          
    // }


}
}

export default StaffCurrentController;
