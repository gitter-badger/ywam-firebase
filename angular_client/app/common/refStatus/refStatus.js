import angular from 'angular';
import uiRouter from 'angular-ui-router';
import refStatusComponent from './refStatus.component';

let refStatusModule = angular.module('refStatus', [
  uiRouter
])

.component('refStatus', refStatusComponent)

.name;

export default refStatusModule;
