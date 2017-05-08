import angular from 'angular';
import uiRouter from 'angular-ui-router';
import designationEditComponent from './designationEdit.component';

let designationEditModule = angular.module('designationEdit', [
  uiRouter
])
// .config(($stateProvider) => {
//   "ngInject";
//   $stateProvider
//     .state('designationEdit', {
//       url: '/designationEdit',
//       component: 'designationEdit'
//     });
// })
.component('designationEdit', designationEditComponent)

.name;

export default designationEditModule;
