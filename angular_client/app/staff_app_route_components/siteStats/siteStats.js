import angular from 'angular';
import uiRouter from 'angular-ui-router';
import siteStatsComponent from './siteStats.component';

let siteStatsModule = angular.module('siteStats', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('siteStats', {
      url: '/siteStats',
      component: 'siteStats'
    });
})
.component('siteStats', siteStatsComponent)

.name;

export default siteStatsModule;
