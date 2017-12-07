import angular from 'angular';
import uiRouter from 'angular-ui-router';
import basePermissionsComponent from './basePermissions.component';

import basePermissionsAddDialog from './basePermissionsAddDialog/basePermissionsAddDialog';

let basePermissionsModule = angular.module('basePermissions', [
  uiRouter,
  basePermissionsAddDialog
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.permissions', {
      url: '/permissions',
      component: 'basePermissions'
    });
})
.component('basePermissions', basePermissionsComponent)

.name;

export default basePermissionsModule;
