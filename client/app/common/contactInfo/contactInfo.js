import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactInfoComponent from './contactInfo.component';

let contactInfoModule = angular.module('contactInfo', [
  uiRouter
])

.component('contactInfo', contactInfoComponent)

.name;

export default contactInfoModule;
