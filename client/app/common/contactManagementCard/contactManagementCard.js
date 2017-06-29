import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactManagementCardComponent from './contactManagementCard.component';

let contactManagementCardModule = angular.module('contactManagementCard', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('contactManagementCard', {
//       url: '/contactManagementCard',
//       component: 'contactManagementCard'
//     });
// })
.component('contactManagementCard', contactManagementCardComponent)

.name;

export default contactManagementCardModule;
