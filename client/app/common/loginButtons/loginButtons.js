import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginButtonsComponent from './loginButtons.component';

let loginButtonsModule = angular.module('loginButtons', [
  uiRouter
])

.component('loginButtons', loginButtonsComponent)

.name;

export default loginButtonsModule;
