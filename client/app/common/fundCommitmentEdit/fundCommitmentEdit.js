import angular from 'angular';
import uiRouter from 'angular-ui-router';
import fundCommitmentEditComponent from './fundCommitmentEdit.component';

let fundCommitmentEditModule = angular.module('fundCommitmentEdit', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('fundCommitmentEdit', {
//       url: '/fundCommitmentEdit',
//       component: 'fundCommitmentEdit'
//     });
// })
.component('fundCommitmentEdit', fundCommitmentEditComponent)

.name;

export default fundCommitmentEditModule;
