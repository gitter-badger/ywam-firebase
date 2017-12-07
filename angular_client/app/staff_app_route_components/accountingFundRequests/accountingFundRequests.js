import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingFundRequestsComponent from './accountingFundRequests.component';

let accountingFundRequestsModule = angular.module('accountingFundRequests', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.fundRequests', {
      url: '/requests',
      component: 'accountingFundRequests'
    });
})
.component('accountingFundRequests', accountingFundRequestsComponent)

.name;

export default accountingFundRequestsModule;
