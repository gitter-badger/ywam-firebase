import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applicationViewComponent from './applicationView.component';

import 'angular-scroll';

let applicationViewModule = angular.module('applicationView', [
  uiRouter,
  "duScroll"
])

.component('applicationView', applicationViewComponent)

.name;

export default applicationViewModule;
