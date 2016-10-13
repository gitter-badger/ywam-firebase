/* @ngInject */
let SchoolFactory = function ($timeout, $firebaseObject, $firebaseArray) {
  const school = {
    apps : {},
    staff:{}
  };

let getApps = (school_id, accepted_only ) => {
        console.log('calling getApps for '+school_id)
     
          school.apps = []

      var appIndexRef = firebase.database().ref('/schools/'+school_id +'/app_index')
          appIndexRef.on('value', function(indexSnap){

            indexSnap.forEach(function(appSnap){
                if(!accepted_only || appSnap.val() >= 13 ){
                  var data = {id: appSnap.key }
                  var index =  school.apps.push(data)
                      index--
                    // console.log(index)
                    getAppFor(index)
                    getAppMeta(index)

                }//end if accepted only 
            })//end foreach appindex  
          })//end on value 
       
      var appsRef  = firebase.database().ref('/applications')
         
      function getAppFor(index){
              var appId=  school.apps[index].id
            //  console.log('looking up app/for node : '+ appId)
              
              firebase.database().ref('/applications').child(appId).child('for').on('value', function(appForSnap) {
                          school.apps[index].for = appForSnap.val()
                          getProfileCom(appForSnap.val().user_id,index)
                } )//end on value
            
      }     

      function getAppMeta(index){
               var appId =  school.apps[index].id
                //  console.log('looking up app/meta node : '+ appId)
            var appMeta  =    firebase.database().ref('/applications').child(appId).child('meta')//.on('value', function(appMetaSnap) {
                      school.apps[index].meta = $firebaseObject(appMeta)
                    //  console.log( school.apps[index].meta)
                 //   })
      }

      function getProfileCom(user_id, index){
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/com' )
                       school.apps[index].user = $firebaseObject(userRef)
                                                // .on('value',function(snapshot) { 
                                                //   school.apps[index].user  = snapshot.val()
                                                //    $timeout(function() {  });
                                                // })
      }


    return school.apps;
  };


let getStaff = (school_id) => {
  
    var staffIndexRef = firebase.database().ref('/schools/'+school_id +'/staff')
    var profileRef  = firebase.database().ref('/profiles')
    

        staffIndexRef.on('child_added', process)
        staffIndexRef.on('child_removed', remove)
        
        function process(indexSnap) { // loop over children
          
                var staffId = indexSnap.key;
                console.log('adding or removing '+ staffId)
                profileRef.child(staffId).child('com').on('value', function(profileSnap) {
                    if( profileSnap.val() != null ){ 
                            school.staff[staffId] = profileSnap.val();
                               $timeout(function() { })
                    } else { delete school.staff[staffId]
                            console.log('deleted')
                              $timeout(function() { }) }
                });//end profile load
        };//end child_added

    function remove(indexSnap) { // loop over children
            
                  var staffId = indexSnap.key;
                  console.log('adding or removing '+ staffId)
                
                   delete school.staff[staffId]
                              console.log('deleted')
                                $timeout(function() { }) 
                 
          };//end child_added

    return school.staff;



};

let getAdmins = (school_id) => {
    school.admins ={}//clear it out for swiching schools
    var adminIndexRef = firebase.database().ref('/schools/'+school_id +'/admin')
    var profileRef  = firebase.database().ref('/profiles')
    
        adminIndexRef.on('child_added', function(indexSnap) { // loop over children
                var adminId = indexSnap.key;
                console.log(adminId)
                profileRef.child(adminId).child('com').on('value', function(profileSnap) {
                    if( profileSnap.val() != null ){ 
                            school.admins[adminId] = profileSnap.val();
                               $timeout(function() { })
                    } else { delete school.admins[adminId] }
                });//end profile load
        });//end child_added
    return school.admins;
};


  let getSchool = (school_id) => {

       
    var ref = firebase.database().ref('/schools/'+school_id +'/public')

    school.public =   $firebaseObject(ref);

    return school.public;
  };

  return { getApps, getSchool, getStaff, getAdmins};
};

export default SchoolFactory;
