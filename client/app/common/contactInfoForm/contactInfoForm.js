import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactInfoFormComponent from './contactInfoForm.component';

let contactInfoFormModule = angular.module('contactInfoForm', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('contactInfoForm', {
//       url: '/contactInfoForm',
//       component: 'contactInfoForm'
//     });
// })
.component('contactInfoForm', contactInfoFormComponent)

.name;

export default contactInfoFormModule;
