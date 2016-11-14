import angular from 'angular';
import uiRouter from 'angular-ui-router';
import roleCallsListComponent from './roleCallsList.component';

let roleCallsListModule = angular.module('roleCallsList', [
  uiRouter
])

.component('roleCallsList', roleCallsListComponent)

.name;

export default roleCallsListModule;
