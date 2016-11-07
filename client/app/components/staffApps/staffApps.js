import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffAppsComponent from './staffApps.component';

let staffAppsModule = angular.module('staffApps', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('staff.apps', {
      url: '/applications',
      component: 'staffApps'
    })
    .state('staff.application', {
    url:'/application/:app_id/',
    component:'applicationView' ,
   
  })
})

.component('staffApps', staffAppsComponent)

.name;

export default staffAppsModule;
