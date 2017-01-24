import angular from 'angular';
import uiRouter from 'angular-ui-router';
import healthInfoComponent from './healthInfo.component';

let healthInfoModule = angular.module('healthInfo', [
  uiRouter
])

.component('healthInfo', healthInfoComponent)

.name;

export default healthInfoModule;
