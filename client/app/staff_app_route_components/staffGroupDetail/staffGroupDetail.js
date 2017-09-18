import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffGroupDetailComponent from './staffGroupDetail.component';

let staffGroupDetailModule = angular.module('staffGroupDetail', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('staffGroups.detail', {
      url: '/:group_id',
      component: 'staffGroupDetail'
    });
})
.component('staffGroupDetail', staffGroupDetailComponent)

.name;

export default staffGroupDetailModule;
