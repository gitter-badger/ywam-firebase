import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolOutreachComponent from './schoolOutreach.component';

let schoolOutreachModule = angular.module('schoolOutreach', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.outreach', {
      url: '/outreach',
      component: 'schoolOutreach'
    });
})
.component('schoolOutreach', schoolOutreachComponent)

.name;

export default schoolOutreachModule;
