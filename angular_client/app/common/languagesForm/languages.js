import angular from 'angular';
import uiRouter from 'angular-ui-router';
import languagesComponent from './languages.component';

let languagesModule = angular.module('languages', [
  uiRouter
])

.component('languages', languagesComponent)

.name;

export default languagesModule;
