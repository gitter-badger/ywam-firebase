import angular from 'angular';
import uiRouter from 'angular-ui-router';
import fundEditBalanceDialogComponent from './fundEditBalanceDialog.component';

let fundEditBalanceDialogModule = angular.module('fundEditBalanceDialog', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('fundEditBalanceDialog', {
//       url: '/fundEditBalanceDialog',
//       component: 'fundEditBalanceDialog'
//     });
// })
.component('fundEditBalanceDialog', fundEditBalanceDialogComponent)

.name;

export default fundEditBalanceDialogModule;
