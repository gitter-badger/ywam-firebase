import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseVisaRequirementsComponent from './baseVisaRequirements.component';

let baseVisaRequirementsModule = angular.module('baseVisaRequirements', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.visaRequirements', {
      url: '/visaRequirements',
      component: 'baseVisaRequirements'
    });
})
.component('baseVisaRequirements', baseVisaRequirementsComponent)

.name;

export default baseVisaRequirementsModule;
