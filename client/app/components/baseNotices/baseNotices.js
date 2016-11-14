import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseNoticesComponent from './baseNotices.component';

let baseNoticesModule = angular.module('baseNotices', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.notices', {
      url: '/notices',
      component: 'baseNotices'
    });
})
.component('baseNotices', baseNoticesComponent)

.name;

export default baseNoticesModule;
