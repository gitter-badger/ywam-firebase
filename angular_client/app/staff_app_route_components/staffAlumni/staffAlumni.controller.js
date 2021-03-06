class StaffAlumniController {
  /* @ngInject */
  constructor(Site, $firebaseArray, $timeout,$filter) {
    var ctrl = this;
        ctrl.staff = []
        ctrl.avatars = Site.avatars

    var Ref = firebase.database().ref('location').child('alumni_staff_index')

        Ref.on('child_added', function(snap) {
          console.log(snap.key)
     
                      var user_id = snap.key
                          console.log('UserID: ',user_id)

                          firebase.database().ref('/profiles/'+ user_id +'/contact' )
                                         .on('value',function(snapshot) { 
                                            
                                            if(snapshot.val() != null){
                                            
                                            //  var item =  $filter('filter')(ctrl.staff, {id: snapshot.key}, true);
                                            // var index = ctrl.staff.indexOf(item[0])
                                         

                                          $timeout(function() {  
                                            var data = snapshot.val()
                                                data.id = user_id;
                                          //  if(index >-1)    
                                          //  ctrl.staff[index] =data;
                                          //  else
                                           ctrl.staff.push(data);
                                      
                                            // trigger $digest/$apply so Angular syncs the DOM
                                           
                                            });
                                            }
                                         },function(error){console.error(error)})  

                 
                                                     
                },function(error){console.error(error)});


  ctrl.photo_size = 150;
ctrl.print = print;

  function print(size) {
            
                myWindow = window.open(Site.api + '/staff/print_photos/'+size+'/'+ Site.location.id,
                       "_blank");
                myWindow.focus();

            
        }

}
}

export default StaffAlumniController;
