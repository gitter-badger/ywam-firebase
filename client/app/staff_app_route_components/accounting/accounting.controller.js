class AccountingController {
  /* @ngInject */
  constructor($state, $rootScope ) {
       var ctrl = this;

        $rootScope.$on('$viewContentLoaded',function(){ ctrl.current = $state.current.name})


  }
}

export default AccountingController;
