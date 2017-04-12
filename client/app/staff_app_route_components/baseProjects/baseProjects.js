import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseProjectsComponent from './baseProjects.component';

let baseProjectsModule = angular.module('baseProjects', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('projects', {
      url: '/projects',
      component: 'baseProjects'
    });
})

.component('baseProjects', baseProjectsComponent)

.name;

export default baseProjectsModule;
