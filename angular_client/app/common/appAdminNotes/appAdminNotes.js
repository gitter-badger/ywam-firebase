import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appAdminNotesComponent from './appAdminNotes.component';

let appAdminNotesModule = angular.module('appAdminNotes', [
  uiRouter
])

.component('appAdminNotes', appAdminNotesComponent)

.name;

export default appAdminNotesModule;
