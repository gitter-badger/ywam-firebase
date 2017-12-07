import angular from 'angular';
import uiRouter from 'angular-ui-router';
import siteSecurityComponent from './siteSecurity.component';

let siteSecurityModule = angular.module('siteSecurity', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('siteSecurity', {
      url: '/siteSecurity',
      component: 'siteSecurity'
    });
})
.component('siteSecurity', siteSecurityComponent)

.name;

export default siteSecurityModule;
