import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileApplicationsListComponent from './profileApplicationsList.component';

let profileApplicationsListModule = angular.module('profileApplicationsList', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('profileApplicationsList', {
//       url: '/profileApplicationsList',
//       component: 'profileApplicationsList'
//     });
// })
.component('profileApplicationsList', profileApplicationsListComponent)

.name;

export default profileApplicationsListModule;
