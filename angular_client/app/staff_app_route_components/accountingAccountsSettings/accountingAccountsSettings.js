import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingAccountsSettingsComponent from './accountingAccountsSettings.component';

let accountingAccountsSettingsModule = angular.module('accountingAccountsSettings', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.accounts.view.settings', {
      url: '/settings',
      component: 'accountingAccountsSettings'
    });
})
.component('accountingAccountsSettings', accountingAccountsSettingsComponent)

.name;

export default accountingAccountsSettingsModule;
