import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseComponent from './base.component';

let baseModule = angular.module('base', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base', {
      url: '/base',
      component: 'base'
    });
})

.component('base', baseComponent)

.name;

export default baseModule;
