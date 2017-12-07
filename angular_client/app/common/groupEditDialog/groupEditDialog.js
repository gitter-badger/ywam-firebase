import angular from 'angular';
import uiRouter from 'angular-ui-router';
import groupEditDialogComponent from './groupEditDialog.component';

let groupEditDialogModule = angular.module('groupEditDialog', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('groupEditDialog', {
//       url: '/groupEditDialog',
//       component: 'groupEditDialog'
//     });
// })
.component('groupEditDialog', groupEditDialogComponent)

.name;

export default groupEditDialogModule;
