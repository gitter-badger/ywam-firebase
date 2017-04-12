import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angularjs-datepicker';
import 'angularjs-datepicker/dist/angular-datepicker.min.css';
import  'ng-img-crop-full-extended/compile/unminified/ng-img-crop';
import schoolSettingsComponent from './schoolSettings.component';

let schoolSettingsModule = angular.module('schoolSettings', [
  uiRouter,
  '720kb.datepicker',
  'ngImgCrop'
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.settings', {
      url: '/settings',
      component: 'schoolSettings'
    });
})


.component('schoolSettings', schoolSettingsComponent)

.name;

export default schoolSettingsModule;
