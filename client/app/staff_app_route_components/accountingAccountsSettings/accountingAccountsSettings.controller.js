class AccountingAccountsSettingsController {
   /* @ngInject */
  constructor($firebaseObject, $stateParams, $scope) {
    var ctrl = this;
        

        var Settings = firebase.database().ref('/finance_accounts/'+$stateParams.account_id+'/settings')
         $firebaseObject(Settings).$bindTo($scope, "$ctrl.settings");
        
  }
}

export default AccountingAccountsSettingsController;
