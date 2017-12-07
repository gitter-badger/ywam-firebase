import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingAccountsIncomeTransactionsComponent from './accountingAccountsIncomeTransactions.component';

let accountingAccountsIncomeTransactionsModule = angular.module('accountingAccountsIncomeTransactions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.accounts.view.income', {
      url: '/income',
      component: 'accountingAccountsIncomeTransactions'
    });
})
.component('accountingAccountsIncomeTransactions', accountingAccountsIncomeTransactionsComponent)

.name;

export default accountingAccountsIncomeTransactionsModule;
