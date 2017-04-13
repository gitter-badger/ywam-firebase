class SchoolListController {
   /* @ngInject */
  constructor($timeout,$translate,$state,Site, Auth,$firebaseStorage) {
       var ctrl = this;
       ctrl.applyNow = applyNow;
       ctrl.schools = [];
       ctrl.location = Site.location
     
       ctrl.$onInit = onInit

       function onInit(){
        
        console.log('hello from the school list controller')
          //get list of online schools for location
          var ref = firebase.database().ref('locations_public').child(Site.location_id).child('online_schools');
              ref.on('child_added', function(snapshot) {
             
                var school_id = snapshot.key  

                firebase.database().ref('/schools/'+school_id + '/public').once('value',function(snapshot) 
                {
                    $timeout(function()  // trigger $digest/$apply so Angular syncs the DOM
                    {
                        if( snapshot.val() != null )  
                        {
                          var data = snapshot.val();
                            var ref = snapshot.ref
                            var school_id = ref.parent.key
                            console.log(school_id)
                              data.id = school_id;
                          var index = ctrl.schools.push(data );
                            index--

                            //   //get banner
                            // var storageRef = firebase.storage().ref("schools_public/"+ school_id).child('banner_1080.jpg');
                            //   console.log(ctrl.schools[index])
                            // $firebaseStorage(storageRef).$getDownloadURL()
                            //       .then(function(url) {
                            //               ctrl.schools[index].banner =  url;
                            //             }).catch(function(){console.log('no Banner found for school')});
                            
                           check_for_apps()  

                        }
                        else 
                        { //delete ctrl.schools[key]
                        }
                    });//end time $timeout
                  });//end on value
           
      });// end on value
          
      }//end on onInit


      //if and once a user is logged in, loop over list of schools to see if the user already has started the application
       Auth.$onAuthStateChanged(function(firebaseUser) {
              if(firebaseUser){
                    ctrl.user_id =firebaseUser.uid
                    
                   check_for_apps()
                    
                 
                  
              }
        });

      function check_for_apps(){
          if(ctrl.user_id){
            ctrl.schools.forEach(function(value,index){
                         
                           firebase.database().ref('profiles').child(ctrl.user_id).child('app_index/')
                              .orderByChild('for/school_id').equalTo(value.id).on('child_added',(snap)=>
                              {
                                if(snap.val())
                                {
                                  console.log('already has an application for school! ', snap.val())
                                  ctrl.schools[index].user_has_app = snap.key
                                  ctrl.schools[index].user_has_app_status = snap.val().status
                                  $timeout(()=>{})
                                }
                              
                              })
                     })
          }
      }

    function applyNow(school_id){
     console.log(school_id)
     $state.go('start',{app_for:'school_' + school_id});

    }
      
  }
}

export default SchoolListController;
