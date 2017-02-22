/* @ngInject */
let SchoolFactory = function ($timeout, $firebaseObject, $firebaseArray, moment, Site) {
  const school = {
    apps : [],
    staff:{},
    stats: {started_week:[]}
  };
  const stats = {started_week:[]}
let getApps = (school_id, accepted_only ) => {
        console.log('calling getApps for '+school_id)
     
          school.apps = []

      var appIndexRef = firebase.database().ref('/schools/'+school_id +'/app_index')
          appIndexRef.on('value', function(indexSnap){

 //console.log(indexSnap.numChildren())
             
            indexSnap.forEach(function(appSnap){
                  
               if(!accepted_only || appSnap.val() >= 13 ){
                  var data = {id: appSnap.key }
                  var index =  school.apps.push(data)
                     console.log(index)
                      index--
                  
                    getAppFor(index)
                    getAppMeta(index)

                    // if(index ==  indexSnap.numChildren()){
                    //   console.log('this is the last ')

                    // }

               }//end if accepted only 
            })//end foreach appindex  
          })//end on value 
       
      var appsRef  = firebase.database().ref('/applications')
         
      function getAppFor(index){

              var appId=  school.apps[index].id
            //  console.log('looking up app/for node : '+ appId)
              
              firebase.database().ref('/applications').child(appId).child('for').once('value', function(appForSnap) {
                        if(appForSnap.val()){
                         school.apps[index].for = appForSnap.val()
                         getProfileCom(appForSnap.val().user_id,index)
                         
                        }else{
                          console.error('no Application actually found for this index'+ appId)
                        }
                } )//end on value
            
      }     

      function getAppMeta(index){
               var appId =  school.apps[index].id
                //  console.log('looking up app/meta node : '+ appId)
            var appMeta  =    firebase.database().ref('/applications').child(appId).child('meta')//.on('value', function(appMetaSnap) {
                 school.apps[index].meta = $firebaseObject(appMeta)
              //   appMeta.once('value', appMetaSnap =>{
                 
              //    if(appMetaSnap.val()){
              //     school.apps[index].meta = appMetaSnap.val()

              //  }


              //   })     
                     
      }

      function getProfileCom(user_id, index){
                      //get avatar as well
                      Site.getAvatar(user_id)
                   
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/com' )
                      userRef.once('value',function(snapshot) { 
                                                  school.apps[index].user  = snapshot.val()
                                                   $timeout(function() {  });
                                                     getNationality(user_id, index)
                                                })
      }

      function getNationality(user_id, index){
                     
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/passport/nation_id' )
                      userRef.once('value',function(snapshot) { 
                                                  school.apps[index].user.nation_id  = snapshot.val()
                                                  //  $timeout(function() {  });
                                                })
      }


    return school.apps;
  };


let getStaffRoles = (school_id) => {
    school.staff={}

    var staffIndexRef = firebase.database().ref('/schools/'+school_id +'/roles')
    var profileRef  = firebase.database().ref('/profiles')
    

        staffIndexRef.on('child_added', process)
        staffIndexRef.on('child_changed', process)
        staffIndexRef.on('child_removed', remove)
        
        function process(indexSnap) { // loop over children
          
                var staffId = indexSnap.key;
                console.log('adding or removing '+ staffId)
                profileRef.child(staffId).child('com').once('value', function(profileSnap) {
                    if( profileSnap.val() != null ){ 
                       //get avatar as well
                            Site.getAvatar(staffId)
                            school.staff[staffId] = indexSnap.val() 
                             school.staff[staffId].name =    profileSnap.val().first_name + ' '+profileSnap.val().last_name;
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

// let getAdmins = (school_id) => {
//     school.admins ={}//clear it out for swiching schools
//     var adminIndexRef = firebase.database().ref('/schools/'+school_id +'/admin')
//     var profileRef  = firebase.database().ref('/profiles')
    
//         adminIndexRef.on('child_added', function(indexSnap) { // loop over children
//                 var adminId = indexSnap.key;
//                 console.log(adminId)
//                 profileRef.child(adminId).child('com').on('value', function(profileSnap) {
//                     if( profileSnap.val() != null ){ 
//                             school.admins[adminId] = profileSnap.val();
//                                $timeout(function() { })
//                     } else { delete school.admins[adminId] }
//                 });//end profile load
//         });//end child_added
//     return school.admins;
// };


  let getSchool = (school_id) => {

       
    var ref = firebase.database().ref('/schools/'+school_id +'/public')

    school.public =   $firebaseObject(ref);

    return school.public;
  };

  return { getApps, getSchool, getStaffRoles};
};

export default SchoolFactory;
