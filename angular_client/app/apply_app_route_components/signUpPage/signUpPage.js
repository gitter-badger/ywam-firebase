import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signUpPageComponent from './signUpPage.component';

let signUpPageModule = angular.module('signUpPage', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('signUp', {
      url: '/signUp/?app_for',
      component: 'signUpPage'
    });
})
.component('signUpPage', signUpPageComponent)

.name;

export default signUpPageModule;
