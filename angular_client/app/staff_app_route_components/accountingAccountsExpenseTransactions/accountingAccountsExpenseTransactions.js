import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingAccountsExpenseTransactionsComponent from './accountingAccountsExpenseTransactions.component';

let accountingAccountsExpenseTransactionsModule = angular.module('accountingAccountsExpenseTransactions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.accounts.view.expense', {
      url: '/expense',
      component: 'accountingAccountsExpenseTransactions'
    });
})
.component('accountingAccountsExpenseTransactions', accountingAccountsExpenseTransactionsComponent)

.name;

export default accountingAccountsExpenseTransactionsModule;
