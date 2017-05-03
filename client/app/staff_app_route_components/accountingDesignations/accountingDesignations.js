import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingDesignationsComponent from './accountingDesignations.component';

let accountingDesignationsModule = angular.module('accountingDesignations', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.designations', {
      url: '/designations',
      component: 'accountingDesignations'
    });
})
.component('accountingDesignations', accountingDesignationsComponent)

.name;

export default accountingDesignationsModule;
