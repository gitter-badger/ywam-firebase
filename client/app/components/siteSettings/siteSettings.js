import angular from 'angular';
import uiRouter from 'angular-ui-router';
import siteSettingsComponent from './siteSettings.component';

let siteSettingsModule = angular.module('siteSettings', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('settings', {
      url: '/settings',
      component: 'siteSettings'
    });
})
.component('siteSettings', siteSettingsComponent)

.name;

export default siteSettingsModule;
