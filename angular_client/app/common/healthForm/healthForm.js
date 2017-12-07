import angular from 'angular';
import uiRouter from 'angular-ui-router';
import healthFormComponent from './healthForm.component';

let healthFormModule = angular.module('healthForm', [
  uiRouter
])

.component('healthForm', healthFormComponent)

.name;

export default healthFormModule;
