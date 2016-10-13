import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffCurrentComponent from './staffCurrent.component';

let staffCurrentModule = angular.module('staffCurrent', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('staff.current', {
      url: '/current',
      component: 'staffCurrent'
    });
})
.component('staffCurrent', staffCurrentComponent)

.name;

export default staffCurrentModule;
