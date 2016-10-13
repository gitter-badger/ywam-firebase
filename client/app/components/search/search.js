import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchComponent from './search.component';

let searchModule = angular.module('search', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('search', {
      url: '/search',
      component: 'search'
    });
})

.component('search', searchComponent)

.name;

export default searchModule;
