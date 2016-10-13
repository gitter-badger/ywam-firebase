import template from './appStatus.html';
import controller from './appStatus.controller';
import './appStatus.styl';

let appStatusComponent = {
  restrict: 'E',
  bindings: { data : '=',
              date : '='},
  template,
  controller
};

export default appStatusComponent;
