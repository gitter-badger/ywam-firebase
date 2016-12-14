class SchoolsPageController {
     /* @ngInject */
  constructor( $timeout,$firebaseArray,moment,Site, $filter,$mdMedia) {


    var ref = firebase.database().ref('/locations').child(Site.location_id).child('schools_index');
      
      var ctrl = this
          //ctrl.schools = []// $firebaseArray(ref);
          ctrl.now = moment().format("YYYY-MM-DD");
          ctrl.$mdMedia = $mdMedia
      
       ref.on('value', function(snapshot) {
            console.log('got school index')
            ctrl.schools = []
            angular.forEach(snapshot.val(), function(value, key){
                console.log('looking up'+ key)
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
                                       if(index >-1){
                                        ctrl.schools[index] = data 
                                       }else
                                      ctrl.schools.push(data );
                                    }
                               // else { delete ctrl.schools[key] }
                                });

                              //  console.log(ctrl.schools)
                    });//end on value
            });//end for each
      },function(error){console.error(error)}
      );// end on value
          
  }
}

export default SchoolsPageController;
