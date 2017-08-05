import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingTransactionFormComponent from './accountingTransactionForm.component';

let accountingTransactionFormModule = angular.module('accountingTransactionForm', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('accountingTransactionForm', {
//       url: '/accountingTransactionForm',
//       component: 'accountingTransactionForm'
//     });
// })
.component('accountingTransactionForm', accountingTransactionFormComponent)

.name;

export default accountingTransactionFormModule;
