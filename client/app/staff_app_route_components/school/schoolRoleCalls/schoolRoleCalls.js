import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolRoleCallsComponent from './schoolRoleCalls.component';

let schoolRoleCallsModule = angular.module('schoolRoleCalls', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.roleCalls', {
      url: '/roleCalls',
      component: 'schoolRoleCalls'
    });
})


.component('schoolRoleCalls', schoolRoleCallsComponent)

.name;

export default schoolRoleCallsModule;
