import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appStatusesSelectorComponent from './appStatusesSelector.component';

let appStatusesSelectorModule = angular.module('appStatusesSelector', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('appStatusesSelector', {
//       url: '/appStatusesSelector',
//       component: 'appStatusesSelector'
//     });
// })
.component('appStatusesSelector', appStatusesSelectorComponent)

.name;

export default appStatusesSelectorModule;
