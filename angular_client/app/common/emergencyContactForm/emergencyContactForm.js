import angular from 'angular';
import uiRouter from 'angular-ui-router';
import emergencyContactComponent from './emergencyContact.component';

let emergencyContactModule = angular.module('emergencyContact', [
  uiRouter
])

.component('emergencyContact', emergencyContactComponent)

.name;

export default emergencyContactModule;
