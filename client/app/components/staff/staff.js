import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffComponent from './staff.component';

let staffModule = angular.module('staff', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('staff', {
      url: '/staff',
      component: 'staff'
    });
})
.component('staff', staffComponent)

.name;

export default staffModule;
