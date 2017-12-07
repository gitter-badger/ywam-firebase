import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseHousingComponent from './baseHousing.component';

let baseHousingModule = angular.module('baseHousing', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('baseHousing', {
      url: '/baseHousing',
      component: 'baseHousing'
    });
})
.component('baseHousing', baseHousingComponent)

.name;

export default baseHousingModule;
