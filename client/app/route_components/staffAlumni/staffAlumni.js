import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffAlumniComponent from './staffAlumni.component';

let staffAlumniModule = angular.module('staffAlumni', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('staff.alumni', {
      url: '/alumni',
      component: 'staffAlumni'
    });
})
.component('staffAlumni', staffAlumniComponent)

.name;

export default staffAlumniModule;
