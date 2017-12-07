import angular from 'angular';
import uiRouter from 'angular-ui-router';
import postalAddressComponent from './postalAddress.component';

let postalAddressModule = angular.module('postalAddress', [
  uiRouter
])

.component('postalAddress', postalAddressComponent)

.name;

export default postalAddressModule;
