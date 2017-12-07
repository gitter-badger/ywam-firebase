import angular from 'angular';
import uiRouter from 'angular-ui-router';
import fundEditComponent from './fundEdit.component';

let fundEditModule = angular.module('fundEdit', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('fundEdit', {
//       url: '/fundEdit',
//       component: 'fundEdit'
//     });
// })
.component('fundEdit', fundEditComponent)

.name;

export default fundEditModule;
