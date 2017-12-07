import angular from 'angular';
import uiRouter from 'angular-ui-router';
import donorPageComponent from './donorPage.component';

let donorPageModule = angular.module('donorPage', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('donor', {
      // url: '/donorPage',
      component: 'donorPage'
    });
})
.component('donorPage', donorPageComponent)

.name;

export default donorPageModule;
