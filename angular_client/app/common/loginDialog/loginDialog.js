import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginDialogComponent from './loginDialog.component';

let loginDialogModule = angular.module('loginDialog', [
  uiRouter
])

.component('loginDialog', loginDialogComponent)

.name;

export default loginDialogModule;
