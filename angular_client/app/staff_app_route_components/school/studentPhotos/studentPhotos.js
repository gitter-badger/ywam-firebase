import angular from 'angular';
import uiRouter from 'angular-ui-router';
import studentPhotosComponent from './studentPhotos.component';

let studentPhotosModule = angular.module('studentPhotos', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.studentPhotos', {
      url: '/studentPhotos',
      component: 'studentPhotos',
    })
})  
.component('studentPhotos', studentPhotosComponent)

.name;

export default studentPhotosModule;
