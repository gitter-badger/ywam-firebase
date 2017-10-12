import angular from 'angular';
import uiRouter from 'angular-ui-router';

import schoolsPageComponent from './schoolsPage.component';
// import Site from 'common/site/site'

let schoolsPageModule = angular.module('schoolsPage', [
  uiRouter,
  
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('schools', {
      url: '/schools',
      component: 'schoolsPage',
      data: {authRequired:true,
            title:"Schools"},
    });
})

.component('schoolsPage', schoolsPageComponent)

.name;

export default schoolsPageModule;
