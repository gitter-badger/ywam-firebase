import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactManagementEditFormComponent from './contactManagementEditForm.component';

let contactManagementEditFormModule = angular.module('contactManagementEditForm', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('contactManagementEditForm', {
//       url: '/contactManagementEditForm',
//       component: 'contactManagementEditForm'
//     });
// })
.component('contactManagementEditForm', contactManagementEditFormComponent)

.name;

export default contactManagementEditFormModule;
