import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffGroupsComponent from './staffGroups.component';

let staffGroupsModule = angular.module('staffGroups', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('staffGroups', {
      url: '/staffGroups',
      component: 'staffGroups'
    });
})
.component('staffGroups', staffGroupsComponent)

.name;

export default staffGroupsModule;
