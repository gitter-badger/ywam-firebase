import angular from 'angular';
import uiRouter from 'angular-ui-router';
import referenceDisplayComponent from './referenceDisplay.component';

let referenceDisplayModule = angular.module('referenceDisplay', [
  uiRouter
])

.component('referenceDisplay', referenceDisplayComponent)

.name;

export default referenceDisplayModule;
