import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffGroupAddMemberDialogComponent from './staffGroupAddMemberDialog.component';

let staffGroupAddMemberDialogModule = angular.module('staffGroupAddMemberDialog', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('staffGroupAddMemberDialog', {
//       url: '/staffGroupAddMemberDialog',
//       component: 'staffGroupAddMemberDialog'
//     });
// })
.component('staffGroupAddMemberDialog', staffGroupAddMemberDialogComponent)

.name;

export default staffGroupAddMemberDialogModule;
