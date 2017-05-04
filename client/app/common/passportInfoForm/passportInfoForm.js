import angular from 'angular';
import uiRouter from 'angular-ui-router';
import passportInfoFormComponent from './passportInfoForm.component';

let passportInfoFormModule = angular.module('passportInfoForm', [
  uiRouter
])

.component('passportInfoForm', passportInfoFormComponent)

.name;

export default passportInfoFormModule;
