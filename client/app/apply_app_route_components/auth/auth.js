import angular from 'angular';
import uiRouter from 'angular-ui-router';
import authComponent from './auth.component';

let authModule = angular.module('auth.actions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('auth', {
      url: '/auth?mode&oobCode&apiKey',
      component: 'auth',
    });
})
.component('auth', authComponent)

.name;

export default authModule;
