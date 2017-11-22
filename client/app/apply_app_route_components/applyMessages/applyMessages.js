import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applyMessagesComponent from './applyMessages.component';

let applyMessagesModule = angular.module('applyMessages', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('apply.messages', {
      url: '/applyMessages',
      component: 'applyMessages'
    });
})
.component('applyMessages', applyMessagesComponent)

.name;

export default applyMessagesModule;
