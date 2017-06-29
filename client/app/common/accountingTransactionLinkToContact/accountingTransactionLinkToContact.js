import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingTransactionLinkToContactComponent from './accountingTransactionLinkToContact.component';

let accountingTransactionLinkToContactModule = angular.module('accountingTransactionLinkToContact', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('accountingTransactionLinkToContact', {
//       url: '/accountingTransactionLinkToContact',
//       component: 'accountingTransactionLinkToContact'
//     });
// })
.component('accountingTransactionLinkToContact', accountingTransactionLinkToContactComponent)

.name;

export default accountingTransactionLinkToContactModule;
