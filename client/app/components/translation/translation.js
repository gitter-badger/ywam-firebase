import angular from 'angular';
import uiRouter from 'angular-ui-router';
import translationComponent from './translation.component';

let translationModule = angular.module('translation', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('translation', {
      url: '/translation/',
      component: 'translation'
    });
})
.component('translation', translationComponent)

.name;

export default translationModule;
