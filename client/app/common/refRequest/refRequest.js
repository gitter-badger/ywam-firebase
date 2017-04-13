import angular from 'angular';
import uiRouter from 'angular-ui-router';
import refRequestComponent from './refRequest.component';

let refRequestModule = angular.module('refRequest', [
  uiRouter
])

.component('refRequest', refRequestComponent)

.name;

export default refRequestModule;
