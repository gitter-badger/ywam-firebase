import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolPageComponent from './schoolPage.component';

let schoolPageModule = angular.module('schoolPage', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school', {
      url: '/school/:school_id',
      component: 'schoolPage',
     
    });
})

.component('schoolPage', schoolPageComponent)

.name;

export default schoolPageModule;
