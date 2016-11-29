import template from './appAdminNotes.html';
import controller from './appAdminNotes.controller';
import './appAdminNotes.styl';

let appAdminNotesComponent = {
  restrict: 'E',
  bindings:  { appId : '='},
  template,
  controller
};

export default appAdminNotesComponent;
