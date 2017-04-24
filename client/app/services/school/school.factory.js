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
                    //  Site.getAvatar(user_id)
                   
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/contact' )
                      userRef.once('value',function(snapshot) { 
                                                  school.apps[index].user  = snapshot.val()
                                                  //  $timeout(function() {  });
                                                     getNationality(user_id, index)
                                                })
      }

      function getNationality(user_id, index){
                     
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/passport/nation_id' )
                      userRef.once('value',function(snapshot) { 
                            school.apps[index].user.nation_id  = snapshot.val()
                            firebase.database().ref('phrases/nations/'+Site.language+'/'+snapshot.val()).once('value',function (snap){
                                    school.apps[index].user.nationality = snap.val()                      
                                                   $timeout();
                                                })
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
                profileRef.child(staffId).child('contact').once('value', function(profileSnap) {
                    if( profileSnap.val() != null ){ 
                       //get avatar as well
                           
                            school.staff[staffId] = indexSnap.val() 
                             school.staff[staffId].name =    profileSnap.val().first_name + ' '+profileSnap.val().last_name;
                             school.staff[staffId].avatar = profileSnap.val().avatar_200
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

// let getLeaders = (school_id) => {
//     var leaders ={}//clear it out for swiching schools
//     var rolesIndexRef = firebase.database().ref('/schools/'+school_id +'/roles').orderByChild('leader').equalTo(true)
//     var profileRef  = firebase.database().ref('/profiles')
    
//         rolesIndexRef.on('child_added', function(indexSnap) { // loop over children
//                 var rolesId = indexSnap.key;
//                 console.log(rolesId)
//                 profileRef.child(rolesId).child('contact').on('value', function(profileSnap) {
//                     if( profileSnap.val() != null ){ 
//                             school.leaders[rolesId] = profileSnap.val();
//                                $timeout(function() { })
//                     } else { delete school.leaders[rolesId] }
//                 });//end profile load
//         });//end child_added
//     return leaders;
// };


  let getSchool = (school_id) => {

       
    var ref = firebase.database().ref('/schools/'+school_id +'/public')

    school.public =   $firebaseObject(ref);

    return school.public;
  };

  return { getApps, getSchool, getStaffRoles};
};

export default SchoolFactory;
