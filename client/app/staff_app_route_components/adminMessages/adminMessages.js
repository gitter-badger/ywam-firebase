import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminMessagesComponent from './adminMessages.component';

let adminMessagesModule = angular.module('adminMessages', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('adminMessages', {
      url: '/adminMessages',
      component: 'adminMessages'
    });
})
.component('adminMessages', adminMessagesComponent)

.name;

export default adminMessagesModule;
