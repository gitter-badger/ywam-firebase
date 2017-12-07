import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingPaypalEventsComponent from './accountingPaypalEvents.component';

let accountingPaypalEventsModule = angular.module('accountingPaypalEvents', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.paypalEvents', {
      url: '/paypalEvents',
      component: 'accountingPaypalEvents'
    });
})
.component('accountingPaypalEvents', accountingPaypalEventsComponent)

.name;

export default accountingPaypalEventsModule;
