import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseProjectTaskEditComponent from './baseProjectTaskEdit.component';

let baseProjectTaskEditModule = angular.module('baseProjectTaskEdit', [
  uiRouter
])

.component('baseProjectTaskEdit', baseProjectTaskEditComponent)

.name;

export default baseProjectTaskEditModule;
