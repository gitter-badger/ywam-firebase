import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseContactsComponent from './baseContacts.component';

let baseContactsModule = angular.module('baseContacts', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('baseContacts', {
      url: '/baseContacts',
      component: 'baseContacts'
    });
})
.component('baseContacts', baseContactsComponent)

.name;

export default baseContactsModule;
