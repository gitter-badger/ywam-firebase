class PassportInfoController {
   /* @ngInject */
  constructor($timeout,$stateParams,Site) {
    var ctrl = this;
        console.log(ctrl.userId); 
        ctrl.name = 'passportInfo';
//      ctrl.user_id = $stateParams.user_id
      ctrl.editPassportDialog = editPassportDialog
       ctrl.unlinkProvider = unlinkProvider
    console.log(ctrl.userId)
       ctrl.$onInit = function() { 
       firebase.database().ref('profiles/'+ctrl.userId+'/passport/').on('value',function (snap){
        ctrl.passport=snap.val()
           
       $timeout() 
      })
                                  
    }//end on init
       
    function editPassportDialog($event) {
        var template= '<passport-info-form user-id="'+ctrl.userId+'"></passport-info-form>'
           
         Site.showDialog($event, template, 'save_changes' )
      
    }  
      
      
      function unlinkProvider(provider){       
        firebase.auth().currentUser.unlink(provider.providerId).then(function() {
          // Auth provider unlinked from account
          console.log('sucessful un link of '+provider.providerId )
        }).catch(function(error) {
          // An error happened
          console.log(error)
        });



     }
       
  }
}

export default PassportInfoController;
