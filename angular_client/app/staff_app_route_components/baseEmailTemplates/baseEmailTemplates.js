import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseEmailTemplatesComponent from './baseEmailTemplates.component';

let baseEmailTemplatesModule = angular.module('baseEmailTemplates', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.emailTemplates', {
      url: '/emailTemplates',
      component: 'baseEmailTemplates'
    });
})
.component('baseEmailTemplates', baseEmailTemplatesComponent)

.name;

export default baseEmailTemplatesModule;
