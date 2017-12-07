import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  

  $stateProvider
    .state('staffHome', {
      url: '/home',
      component: 'home'
    });
})

.component('home', homeComponent)
  
.name;

export default homeModule;
