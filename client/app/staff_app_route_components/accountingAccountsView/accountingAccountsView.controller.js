class AccountingAccountsViewController {
   /* @ngInject */
  constructor($scope,$stateParams,$firebaseObject,  $rootScope, $state) {
    var ctrl = this;
        
           $rootScope.$on('$viewContentLoaded',function(){
           ctrl.current = $state.current.name
          //  console.log(ctrl.current)
          })
       
        var Ref = firebase.database().ref('/finance_accounts/'+$stateParams.account_id+'/balances')
         $firebaseObject(Ref).$bindTo($scope, "$ctrl.balances");
      
       
  }
}

export default AccountingAccountsViewController;
