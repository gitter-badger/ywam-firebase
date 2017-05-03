import angular from 'angular';
import uiRouter from 'angular-ui-router';
import designationInfoComponent from './designationInfo.component';

let designationInfoModule = angular.module('designationInfo', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.designationInfo', {
      url: '/designationInfo/:code',
      component: 'designationInfo'
    });
})
.component('designationInfo', designationInfoComponent)

.name;

export default designationInfoModule;
