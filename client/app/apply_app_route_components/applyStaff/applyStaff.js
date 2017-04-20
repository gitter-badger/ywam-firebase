import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applyStaffComponent from './applyStaff.component';

let applyStaffModule = angular.module('applyStaff', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('apply.staff', {
      url: '/applyStaff',
      component: 'applyStaff',
    });
})
.component('applyStaff', applyStaffComponent)

.name;

export default applyStaffModule;
