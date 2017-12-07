import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseBuildingsComponent from './baseBuildings.component';

let baseBuildingsModule = angular.module('baseBuildings', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.buildings', {
      url: '/buildings',
      component: 'baseBuildings'
    });
})
.component('baseBuildings', baseBuildingsComponent)

.name;

export default baseBuildingsModule;
