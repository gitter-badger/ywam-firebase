import angular from 'angular';
import uiRouter from 'angular-ui-router';
import basePermissionsAddDialogComponent from './basePermissionsAddDialog.component';

let basePermissionsAddDialogModule = angular.module('basePermissionsAddDialog', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('basePermissionsAddDialog', {
//       url: '/basePermissionsAddDialog',
//       component: 'basePermissionsAddDialog'
//     });
// })
.component('basePermissionsAddDialog', basePermissionsAddDialogComponent)

.name;

export default basePermissionsAddDialogModule;
