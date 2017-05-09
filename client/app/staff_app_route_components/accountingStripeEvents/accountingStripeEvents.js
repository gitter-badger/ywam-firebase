import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingStripeEventsComponent from './accountingStripeEvents.component';

let accountingStripeEventsModule = angular.module('accountingStripeEvents', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.stripeEvents', {
      url: '/stripeEvents',
      component: 'accountingStripeEvents'
    });
})
.component('accountingStripeEvents', accountingStripeEventsComponent)

.name;

export default accountingStripeEventsModule;
