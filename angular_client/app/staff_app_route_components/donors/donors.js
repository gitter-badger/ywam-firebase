import angular from 'angular';
import uiRouter from 'angular-ui-router';
import donorsComponent from './donors.component';

let donorsModule = angular.module('donors', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('donors', {
      url: '/donors',
      component: 'donors'
    });
})
.component('donors', donorsComponent)

.name;

export default donorsModule;
