import angular from 'angular';
import uiRouter from 'angular-ui-router';
import permissionsComponent from './permissions.component';

let permissionsModule = angular.module('permissions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('settings.permissions', {
      url: '/permissions',
      component: 'permissions'
    });
})
.component('permissions', permissionsComponent)

.name;

export default permissionsModule;
