import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applicationQuestionAdminEditComponent from './applicationQuestionAdminEdit.component';

let applicationQuestionAdminEditModule = angular.module('applicationQuestionAdminEdit', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('applicationQuestionAdminEdit', {
//       url: '/applicationQuestionAdminEdit',
//       component: 'applicationQuestionAdminEdit'
//     });
// })
.component('applicationQuestionAdminEdit', applicationQuestionAdminEditComponent)

.name;

export default applicationQuestionAdminEditModule;
