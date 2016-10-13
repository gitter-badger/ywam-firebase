import angular from 'angular';
import uiRouter from 'angular-ui-router';
import forgotPasswordComponent from './forgotPassword.component';

let forgotPasswordModule = angular.module('forgotPassword', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('forgotPassword', {
      url: '/forgot_password',
      component: 'forgotPassword'
    });
})
.component('forgotPassword', forgotPasswordComponent)

.name;

export default forgotPasswordModule;
