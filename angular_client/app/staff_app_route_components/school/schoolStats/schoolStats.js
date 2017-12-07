import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolStatsComponent from './schoolStats.component';

let schoolStatsModule = angular.module('schoolStats', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.stats', {
      url: '/stats',
      component: 'schoolStats'
    });
})
.component('schoolStats', schoolStatsComponent)

.name;

export default schoolStatsModule;
