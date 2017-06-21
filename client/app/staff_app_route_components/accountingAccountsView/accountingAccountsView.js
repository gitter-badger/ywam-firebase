import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingAccountsViewComponent from './accountingAccountsView.component';

let accountingAccountsViewModule = angular.module('accountingAccountsView', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.accounts.view', {
      url: '/:account_id',
      component: 'accountingAccountsView'
    });
})
.component('accountingAccountsView', accountingAccountsViewComponent)

.name;

export default accountingAccountsViewModule;
