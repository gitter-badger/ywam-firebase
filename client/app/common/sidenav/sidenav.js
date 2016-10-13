import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sidenavComponent from './sidenav.component';

let sidenavModule = angular.module('sidenav', [
  uiRouter
])

.component('sidenav', sidenavComponent)

.name;

export default sidenavModule;
