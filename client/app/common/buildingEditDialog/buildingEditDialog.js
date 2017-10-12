import angular from 'angular';
import uiRouter from 'angular-ui-router';
import buildingEditDialogComponent from './buildingEditDialog.component';

let buildingEditDialogModule = angular.module('buildingEditDialog', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('buildingEditDialog', {
//       url: '/buildingEditDialog',
//       component: 'buildingEditDialog'
//     });
// })
.component('buildingEditDialog', buildingEditDialogComponent)

.name;

export default buildingEditDialogModule;
