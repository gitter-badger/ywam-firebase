class PostalAddressController {
   /* @ngInject */
  constructor(Auth, $firebaseObject, $scope, $firebaseArray, $filter ,$translate,$timeout ) {

         var ctrl = this;
             ctrl.nations = []
         var user_id = Auth.$getAuth().uid
         var profile_contact_postal_ref =   firebase.database().ref('/profiles/' +user_id+'/postal' );
         $firebaseObject(profile_contact_postal_ref).$bindTo($scope, "postal");
           
             $scope.$watch('$ctrl.AddressForm.$valid',function(v){
             
                  ctrl.isValid = ctrl.AddressForm.$valid ? ctrl.isValid = true: ctrl.isValid = false;
               $timeout()
               
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
                 profile_contact_postal_ref.on('value',function(snap){
                if( snap.val().nation_id){
                  $timeout(function(){
                    ctrl.post_nation = $filter('filter')(ctrl.nations,  {id: snap.val().nation_id})[0];
                  
                    console.log('set postal nation to' , ctrl.post_nation)
                  },1000)
             }//end if nation pre set
             })
               
            })
           

           ctrl.getMatches = function (searchText){
                  return $filter('filter')(ctrl.nations, searchText);
            } 

         ctrl.updateNation = function (id){
           if(id)
           profile_contact_postal_ref.child('nation_id').set(id)
         }
             

  }
}

export default PostalAddressController;
