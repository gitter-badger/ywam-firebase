import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingFundExpensesComponent from './accountingFundExpenses.component';

let accountingFundExpensesModule = angular.module('accountingFundExpenses', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.fundExpenses', {
      url: '/fundExpenses',
      component: 'accountingFundExpenses'
    });
})
.component('accountingFundExpenses', accountingFundExpensesComponent)

.name;

export default accountingFundExpensesModule;
