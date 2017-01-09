import angular from 'angular';
import uiRouter from 'angular-ui-router';
import siteTaskListComponent from './siteTaskList.component';

let siteTaskListModule = angular.module('siteTaskList', [
  uiRouter
])

.component('siteTaskList', siteTaskListComponent)

.name;

export default siteTaskListModule;
