import angular from 'angular';
import uiRouter from 'angular-ui-router';
import  'ng-img-crop-full-extended/compile/unminified/ng-img-crop';
import userPhotoUploadComponent from './userPhotoUpload.component';

let userPhotoUploadModule = angular.module('userPhotoUpload', [
  uiRouter,  'ngImgCrop'
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('userPhotoUpload', {
      url: '/userPhotoUpload/:user_id',
      component: 'userPhotoUpload'
    });
})

.component('userPhotoUpload', userPhotoUploadComponent)

.name;

export default userPhotoUploadModule;
