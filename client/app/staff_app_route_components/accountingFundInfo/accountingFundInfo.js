import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingFundInfoComponent from './accountingFundInfo.component';

let accountingFundInfoModule = angular.module('accountingFundInfo', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.fund', {
      url: '/fundInfo/:code',
      component: 'accountingFundInfo'
    });
})
.component('accountingFundInfo', accountingFundInfoComponent)

.name;

export default accountingFundInfoModule;
