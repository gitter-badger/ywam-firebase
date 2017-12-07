import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appStatusComponent from './appStatus.component';

let appStatusModule = angular.module('appStatus', [
  uiRouter
])

.component('appStatus', appStatusComponent)

.name;

export default appStatusModule;
