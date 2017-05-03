import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingPaypalPageComponent from './accountingPaypalPage.component';

let accountingPaypalPageModule = angular.module('accountingPaypalPage', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.paypal', {
      url: '/paypal',
      component: 'accountingPaypalPage'
    });
})
.component('accountingPaypalPage', accountingPaypalPageComponent)

.name;

export default accountingPaypalPageModule;
