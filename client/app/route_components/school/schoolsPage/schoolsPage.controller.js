class SchoolsPageController {
     /* @ngInject */
  constructor( $timeout,$firebaseArray,moment,Site, $filter,$mdMedia,$firebaseStorage) {


    var ref = firebase.database().ref('/locations').child(Site.location_id).child('schools_index');
      
      var ctrl = this
          //ctrl.schools = []// $firebaseArray(ref);
          ctrl.now = moment().format("YYYY-MM-DD");
          ctrl.in30days = moment().add(30, 'days').format("YYYY-MM-DD");
          ctrl.$mdMedia = $mdMedia
      
       ref.on('value', function(snapshot) {
           // console.log('got school index')
            ctrl.schools = []
            ctrl.total_dts_students = 0
            ctrl.total_secondary_students = 0
            angular.forEach(snapshot.val(), function(value, key){
              //  console.log('looking up'+ key)
              firebase.database().ref('/schools/'+key )
                  .on('value',function(snapshot) {

                    var school =  $filter('filter')(ctrl.schools, {id: key}, true);
                    var index = ctrl.schools.indexOf(school[0])
                        //since a school could update value at any time..we make sure to add it to the already existing school in array instead of pushing a new one in. 
                       
                      

                                // trigger $digest/$apply so Angular syncs the DOM
                              $timeout(function() {
                                if( snapshot.val() != null )  {
                                   var data = snapshot.val();
                                      data.id = key;
                                      data.leaders ={}
                                   

                                       if(index >-1){
                                        ctrl.schools[index] = data 
                                        
                                       }else{
                                        var newIndex =   ctrl.schools.push(data );
                                          getLeaders(newIndex,data) 
                                          if(data.public.is_secondary)
                                          ctrl.total_secondary_students += data.count.arrived
                                          else
                                          ctrl.total_dts_students += data.count.arrived
                                        }
                                    

                                     
                                    }
                               // else { delete ctrl.schools[key] }
                                });

                              //  console.log(ctrl.schools)
                    });//end on value
            });//end for each
      },function(error){console.error(error)}
      );// end on value


function getLeaders(index,school){

  // console.log(school.leaders)
    index--
    var rolesIndexRef = firebase.database().ref('/schools/'+school.id +'/roles').orderByChild('leader').equalTo(true)
    var profileRef  = firebase.database().ref('/profiles')
    
        rolesIndexRef.on('child_added', function(indexSnap) { // loop over children
                var rolesId = indexSnap.key;
                // console.log(rolesId)
                profileRef.child(rolesId).child('com').on('value', function(profileSnap) {
                    if( profileSnap.val() != null ){ 
                            ctrl.schools[index].leaders[rolesId] = profileSnap.val();
                               $timeout(function() { })
                    } else { delete ctrl.schools[index].leaders[rolesId] }
                });//end profile load
        });//end child_added


}


  }
}

export default SchoolsPageController;
