import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingBrainTreeComponent from './accountingBrainTree.component';

let accountingBrainTreeModule = angular.module('accountingBrainTree', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accountingBrainTree', {
      url: '/accountingBrainTree',
      component: 'accountingBrainTree'
    });
})
.component('accountingBrainTree', accountingBrainTreeComponent)

.name;

export default accountingBrainTreeModule;
