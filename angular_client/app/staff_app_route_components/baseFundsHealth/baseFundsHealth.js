import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseFundsHealthComponent from './baseFundsHealth.component';

let baseFundsHealthModule = angular.module('baseFundsHealth', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('baseFundsHealth', {
      url: '/baseFundsHealth',
      component: 'baseFundsHealth'
    });
})
.component('baseFundsHealth', baseFundsHealthComponent)

.name;

export default baseFundsHealthModule;
