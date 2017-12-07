import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolListComponent from './schoolList.component';

let schoolListModule = angular.module('schoolList', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('apply.schoolList', {
      url: '/schoolApplyList',
      component: 'schoolList',
      //  resolve:{
      //     "currentAuth":["Auth",function(Auth){
      //         return Auth.$waitForSignIn();
      //     }]
      // }
    });
})

.component('schoolList', schoolListComponent)

.name;

export default schoolListModule;
