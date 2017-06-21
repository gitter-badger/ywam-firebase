class AccountingAccountsViewController {
   /* @ngInject */
  constructor($firebaseArray,$stateParams,$filter,$timeout, Site,ngAudio, $rootScope, $state) {
    var ctrl = this;
        
           $rootScope.$on('$viewContentLoaded',function(){
           ctrl.current = $state.current.name
          //  console.log(ctrl.current)
          })
       
        
      
       
  }
}

export default AccountingAccountsViewController;
