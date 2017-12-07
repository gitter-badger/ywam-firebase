import angular from 'angular';
import uiRouter from 'angular-ui-router';
import passportInfoComponent from './passportInfo.component';

let passportInfoModule = angular.module('passportInfo', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('passportInfo', {
//       url: '/passportInfo',
//       component: 'passportInfo'
//     });
// })
.component('passportInfo', passportInfoComponent)

.name;

export default passportInfoModule;
