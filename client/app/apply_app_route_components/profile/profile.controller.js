class ProfileController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject ,$mdDialog, $mdMedia , $timeout) {
      var ctrl = this;
            ctrl.user_id = $stateParams.user_id    
      var Ref = firebase.database().ref('profiles/'+ctrl.user_id)

          ctrl.profile = $firebaseObject(Ref);
          ctrl.editPostalDialog = editPostalDialog
          ctrl.editPhotoDialog = editPhotoDialog
          ctrl.editPassportDialog = editPassportDialog

          
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



  }
}

export default ProfileController;
