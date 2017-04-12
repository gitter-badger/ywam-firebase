import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolRoleCallComponent from './schoolRoleCall.component';

let schoolRoleCallModule = angular.module('schoolRoleCall', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.roleCall', {
      url: '/roleCall/:roleCallId',
      component: 'schoolRoleCall'
    });
})
.component('schoolRoleCall', schoolRoleCallComponent)

.name;

export default schoolRoleCallModule;
