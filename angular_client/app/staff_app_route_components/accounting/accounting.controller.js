class AccountingController {
  /* @ngInject */
  constructor($state, $rootScope ) {
       var ctrl = this;

        $rootScope.$on('$viewContentLoaded',function(){
           ctrl.current = $state.current.name
           if(ctrl.current.includes('accounts'))
           ctrl.current='accounting.accounts'

           
          })


  }
}

export default AccountingController;
