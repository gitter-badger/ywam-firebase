import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingComponent from './accounting.component';

import 'angular-audio';

let accountingModule = angular.module('accounting', [
  uiRouter,
  'ngAudio'
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting', {
      url: '/accounting/',
      component: 'accounting',
       data: {authRequired:true},
    });
})
.component('accounting', accountingComponent)

.name;

export default accountingModule;
