import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolStaffComponent from './schoolStaff.component';

let schoolStaffModule = angular.module('schoolStaff', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.staff', {
      url: '/staff',
      component: 'schoolStaff'
    });
})
.component('schoolStaff', schoolStaffComponent)

.name;

export default schoolStaffModule;
