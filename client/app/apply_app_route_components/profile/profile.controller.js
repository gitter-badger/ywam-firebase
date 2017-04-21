class ProfileController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject ,$mdDialog, $mdMedia , $timeout,Site) {
      var ctrl = this;
            ctrl.user_id = $stateParams.user_id    
      var contactRef = firebase.database().ref('profiles/'+ctrl.user_id+'/contact')

          ctrl.contact = $firebaseObject(contactRef);
          ctrl.editPostalDialog = editPostalDialog
          ctrl.editPhotoDialog = editPhotoDialog
          ctrl.editPassportDialog = editPassportDialog
           ctrl.calculateAge = calculateAge

        
firebase.database().ref('profiles/'+ctrl.user_id+'/passport/').once('value',function (snap){
  ctrl.passport=snap.val()
  firebase.database().ref('phrases/nations/'+Site.language+'/'+ctrl.passport.nation_id).once('value',function (snap){
  ctrl.nationality= snap.val()
  $timeout()
})
})
          
      function editPostalDialog($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         clickOutsideToClose:true,
         fullscreen: $mdMedia('xs'),
         template:
           '<md-dialog aria-label="dialog"> <md-dialog-content style="padding:15px">'+
           '  <postal-address></postal-address>'+
           '  </md-dialog-content><md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close  </md-button> </md-dialog-actions></md-dialog>',
         controller: function ($scope, $mdDialog) { $scope.closeDialog = function() { $mdDialog.hide();} }
      });
    }    


      function editPhotoDialog($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         clickOutsideToClose:true,
         fullscreen: $mdMedia('xs'),
         template:
           '<md-dialog aria-label="dialog"> <md-dialog-content >'+
           '  <user-photo-upload></user-photo-upload>'+
           '  </md-dialog-content><md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog </md-button> </md-dialog-actions></md-dialog>',
         controller: function ($scope, $mdDialog) { $scope.closeDialog = function() { $mdDialog.hide();} }
      });
    }  
      function editPassportDialog($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         clickOutsideToClose:true,
         fullscreen: $mdMedia('xs'),
         template:
           '<md-dialog aria-label="dialog"> <md-dialog-content style="padding:15px">'+
           '  <passport-info></passport-info>'+
           '  </md-dialog-content><md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog </md-button> </md-dialog-actions></md-dialog>',
         controller: function ($scope, $mdDialog) { $scope.closeDialog = function() { $mdDialog.hide();} }
      });
    }  

    function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() -  new Date(birthday).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

  }
}

export default ProfileController;
