import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userApplicationsListComponent from './userApplicationsList.component';

let userApplicationsListModule = angular.module('userApplicationsList', [
  uiRouter
])

.component('userApplicationsList', userApplicationsListComponent)

.name;

export default userApplicationsListModule;
