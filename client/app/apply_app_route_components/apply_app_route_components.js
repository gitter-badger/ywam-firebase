import angular from 'angular';

import SchoolList from './schoolList/schoolList'
import startApplication from './startApplication/startApplication'
import Application from './application/application';
import forgotPassword from './forgotPassword/forgotPassword';
import signUpPage from './signUpPage/signUpPage';
import profile from './profile/profile'
import apply from './apply/apply'
import applyDashboard from './applyDashboard/applyDashboard'
import applyStaff from './applyStaff/applyStaff'
import referenceForm from './referenceForm/referenceForm'

let componentModule = angular.module('app.apply.components', [

  SchoolList,
  startApplication,
  Application,
  forgotPassword,
  signUpPage,
  profile,
  referenceForm,
  apply,
  applyDashboard,
  applyStaff
])
  
.name;

export default componentModule;
