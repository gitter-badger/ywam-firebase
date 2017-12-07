import angular from 'angular';
import uiRouter from 'angular-ui-router';
import changeUserPhotoComponent from './changeUserPhoto.component';

let changeUserPhotoModule = angular.module('changeUserPhoto', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('changeUserPhoto', {
      url: '/changeUserPhoto/:user_id',
      component: 'changeUserPhoto'
    });
})
.component('changeUserPhoto', changeUserPhotoComponent)

.name;

export default changeUserPhotoModule;
