class PassportInfoController {
     /* @ngInject */
  constructor(Auth, $firebaseObject, $scope, $firebaseArray, $filter ,$translate,$timeout ,Site , moment) {

         var ctrl = this;
            
             ctrl.$onInit = onInit
         
         //start things up
         function onInit() {   

              ctrl.nations = []
             ctrl.updateNation = updateNation
             ctrl.changeIssueDate = changeIssueDate
             ctrl.changeExpireDate = changeExpireDate


            $scope.$watch('PassportForm.$valid',function(v){
                ctrl.isValid = $scope.PassportForm.$valid
            })
           

         var lang_key = $translate.use();    
         var user_id = Auth.$getAuth().uid
         var profile_passport_ref =   firebase.database().ref('/profiles/' +user_id+'/passport' );
             $firebaseObject(profile_passport_ref).$bindTo($scope, "passport");
          
             
             profile_passport_ref.once('value', (snap)=>{
                if(snap.val().issue_date)
                ctrl.issue_date =  new Date( snap.val().issue_date)
                
                if(snap.val().expire_date)
                ctrl.expire_date =  new Date( snap.val().expire_date)
                
            })
          
      
        //load location visa settings
            var settings_ref =  firebase.database().ref('/location_public/settings')   
                settings_ref.once('value', function(snap){
                    ctrl.settings=snap.val()
                })
         //load the list of nations... also in german if that is the language. 
        var nations_ref =  firebase.database().ref('/phrases/nations')   
            nations_ref.child('en').on('child_added',function(snap){
            
              if( lang_key=='de'){

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
                 profile_passport_ref.on('value',function(snap){
                if( snap.val().nation_id){
                  $timeout(function(){
                    ctrl.passport_nation = $filter('filter')(ctrl.nations,  {id: snap.val().nation_id})[0];
                  
                    console.log('set passport nation to' , ctrl.passport_nation)
                  },1000)
             }//end if nation pre set
             })
               
            })
           

       





           ctrl.getMatches = function (searchText){
                  return $filter('filter')(ctrl.nations, searchText);
            } 

          function updateNation(id){
           if(id){
           profile_passport_ref.child('nation_id').set(id)
        
          var nation_reg_ref =  firebase.database().ref('/location_public/nations/'+id)   
          
          if(lang_key=='de'){
          var notices_ref =  firebase.database().ref('/location_public/notices/DE')   
          }else{
          var notices_ref=  firebase.database().ref('/location_public/notices/EN')   
          }
              nation_reg_ref.once('value',function(snap){
                 ctrl.need_invitation = null
                 ctrl.need_entry_visa = null
                 ctrl.need_visa_extention = null
                 ctrl.can_not_process_visa = null

                var nation = snap.val()
                if (nation){
                //check for invitation requirement 
                console.log(nation)
                if(nation.need_invitation){
                    ctrl.need_invitation = $firebaseObject(notices_ref.child('need_invitation'))
                }
                 //check for need_entry_visa requirement 
                if(nation.need_entry_visa){
                    ctrl.need_entry_visa = $firebaseObject(notices_ref.child('need_entry_visa'))
                }
                 //check for need_visa_extention requirement 
                if(nation.need_visa_extention){
                    ctrl.need_visa_extention = $firebaseObject(notices_ref.child('need_visa_extention'))
                }
                  //check for can_not_process_visa 
                if(nation.can_not_process_visa){
                    ctrl.can_not_process_visa = $firebaseObject(notices_ref.child('can_not_process_visa'))
                }
                }//end if nation

              })  

           }

         }

        function changeIssueDate(){
        $scope.passport.issue_date = moment(ctrl.issue_date).format("YYYY-MM-DD");
        //  console.log('changeIssue date ' +  $scope.profile_contact.dob)
        }
        function changeExpireDate(){
        $scope.passport.expire_date = moment(ctrl.expire_date).format("YYYY-MM-DD");
        //  console.log('changeexpire date ' +  $scope.profile_contact.dob)
        }   

  }//end onInit

  }
}

export default PassportInfoController;
