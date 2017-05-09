import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingFundsComponent from './accountingFunds.component';

let accountingFundsModule = angular.module('accountingFunds', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
   .state('accounting.funds', {
      url: '/funds',
      component: 'accountingFunds'
    });
})
.component('accountingFunds', accountingFundsComponent)

.name;

export default accountingFundsModule;
