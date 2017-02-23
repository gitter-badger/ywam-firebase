import angular from 'angular';
import uiRouter from 'angular-ui-router';
import helloComponent from './hello.component';

let helloModule = angular.module('hello', [
  uiRouter
])

.component('hello', helloComponent)

.name;

export default helloModule;
