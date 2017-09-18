import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseContactsImportComponent from './baseContactsImport.component';
import ngCsvImport from 'angular-csv-import';

let baseContactsImportModule = angular.module('baseContactsImport', [
  uiRouter,
  "ngCsvImport"
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('baseContactsImport', {
      url: '/baseContactsImport',
      component: 'baseContactsImport'
    });
})
.component('baseContactsImport', baseContactsImportComponent)

.name;

export default baseContactsImportModule;
