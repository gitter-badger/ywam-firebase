import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applyDashboardComponent from './applyDashboard.component';

let applyDashboardModule = angular.module('applyDashboard', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('apply.dashboard', {
      url: '/dashboard',
      component: 'applyDashboard',
    
      //  resolve:{
      //     "currentAuth":["Auth",function(Auth){
      //         return Auth.$waitForSignIn();
      //     }]
      // }
    });
})
.component('applyDashboard', applyDashboardComponent)

.name;

export default applyDashboardModule;
