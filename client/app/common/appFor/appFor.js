import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appForComponent from './appFor.component';

let appForModule = angular.module('appFor', [
  uiRouter
])

.component('appFor', appForComponent)

.name;

export default appForModule;
