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
        var template=
           '<md-dialog aria-label="dialog"> <md-dialog-content style="padding:15px">'+
           '  <passport-info-form user-id="'+ctrl.userId+'"></passport-info-form>'+
           '  </md-dialog-content><md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog </md-button> </md-dialog-actions></md-dialog>'
         Site.showDialog($event, template)
      
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
