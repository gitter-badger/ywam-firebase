class EmergencyContactController {
   /* @ngInject */
  constructor(Auth,$firebaseObject, $scope, $timeout, $translate, $filter) {
    var ctrl = this;
        ctrl.nations = []

    var user_id = Auth.$getAuth().uid

    var ref =   firebase.database().ref('/profiles/' +user_id+'/emergency_contact' );
         $firebaseObject(ref).$bindTo($scope, "emergency_contact");
           
          $scope.$watch('$ctrl.EMForm.$valid',function(v){
            $timeout(function(){
              ctrl.isValid = ctrl.EMForm.$valid
            })
          })


            //load the list of nations... also in german if that is the language. 
      var nations_ref =  firebase.database().ref('/phrases/nations')   
            nations_ref.child('en').on('child_added',function(snap){
            
              if($translate.use() =='de'){
                  nations_ref.child('de').child(snap.key).once('value', function(snap){
                   var data = { id : snap.key,
                               name:snap.val() }
                      ctrl.nations.push(data)
                })
              } else {
                  var data = { id : snap.key,
                              name:snap.val()}
                      ctrl.nations.push(data)
              }

            })//end on child added

     
     //once all nations loaded and when the field is loaded from profile.. set the nation in autocomplete
            nations_ref.child('en').on('value',()=>{
                console.log('nations loaded')
                ref.on('value',function(snap){
                if( snap.val().nation_id){
                  $timeout(function(){
                    ctrl.em_nation = $filter('filter')(ctrl.nations,  {id: snap.val().nation_id})[0];
                  
                    console.log('set em nation to' , ctrl.em_nation)
                  },1000)
             }//end if nation pre set
             })
               
            })
           

           ctrl.getMatches = function (searchText){
                  return $filter('filter')(ctrl.nations, searchText);
            } 

         ctrl.updateNation = function (id){
           if(id)
          ref.child('nation_id').set(id)
         }



  }
}

export default EmergencyContactController;
