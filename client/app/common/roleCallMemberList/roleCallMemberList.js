import angular from 'angular';
import uiRouter from 'angular-ui-router';
import roleCallMemberListComponent from './roleCallMemberList.component';

let roleCallMemberListModule = angular.module('roleCallMemberList', [
  uiRouter
])

.component('roleCallMemberList', roleCallMemberListComponent)

.name;

export default roleCallMemberListModule;
