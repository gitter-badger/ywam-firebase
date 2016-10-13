import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffAppsComponent from './staffApps.component';

let staffAppsModule = angular.module('staffApps', [
  uiRouter
])

.component('staffApps', staffAppsComponent)

.name;

export default staffAppsModule;
