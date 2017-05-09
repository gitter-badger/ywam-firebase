import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingStripeTransactionsComponent from './accountingStripeTransactions.component';

let accountingStripeTransactionsModule = angular.module('accountingStripeTransactions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.stripeTransactions', {
      url: '/stripeTransactions',
      component: 'accountingStripeTransactions'
    });
})
.component('accountingStripeTransactions', accountingStripeTransactionsComponent)

.name;

export default accountingStripeTransactionsModule;
