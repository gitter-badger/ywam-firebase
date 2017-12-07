import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applicationQuestionsFormComponent from './applicationQuestionsForm.component';

let applicationQuestionsFormModule = angular.module('applicationQuestionsForm', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('applicationQuestionsForm', {
//       url: '/applicationQuestionsForm',
//       component: 'applicationQuestionsForm'
//     });
// })
.component('applicationQuestionsForm', applicationQuestionsFormComponent)

.name;

export default applicationQuestionsFormModule;
