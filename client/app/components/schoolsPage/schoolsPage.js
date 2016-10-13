import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-moment';
import schoolsPageComponent from './schoolsPage.component';
// import Site from 'common/site/site'

let schoolsPageModule = angular.module('schoolsPage', [
  uiRouter,
  'angularMoment'
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('schools', {
      url: '/schools',
      component: 'schoolsPage',
      data: {authRequired:true},
    });
})

.component('schoolsPage', schoolsPageComponent)

.name;

export default schoolsPageModule;
