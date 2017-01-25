import template from './appStatus.html';
import controller from './appStatus.controller';
import './appStatus.styl';

let appStatusComponent = {
  restrict: 'E',
  bindings: { appId : '=',
              date : '=',
              who: '='},
  template,
  controller
};

export default appStatusComponent;
