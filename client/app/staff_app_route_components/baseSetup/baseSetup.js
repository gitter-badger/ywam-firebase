import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseSetupComponent from './baseSetup.component';

let baseSetupModule = angular.module('baseSetup', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.setup', {
      url: '/setup',
      component: 'baseSetup'
    });
})
.component('baseSetup', baseSetupComponent)

.name;

export default baseSetupModule;
