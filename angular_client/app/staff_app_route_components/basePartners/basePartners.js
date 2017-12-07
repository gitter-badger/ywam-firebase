import angular from 'angular';
import uiRouter from 'angular-ui-router';
import basePartnersComponent from './basePartners.component';

let basePartnersModule = angular.module('basePartners', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('basePartners', {
//       url: '/basePartners',
//       component: 'basePartners'
//     });
// })
.component('basePartners', basePartnersComponent)

.name;

export default basePartnersModule;
