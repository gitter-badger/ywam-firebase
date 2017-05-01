import template from './appStatusesSelector.html';
import controller from './appStatusesSelector.controller';
import './appStatusesSelector.styl';

let appStatusesSelectorComponent = {
  restrict: 'E',
  bindings: {statuses:'='},
  template,
  controller
};

export default appStatusesSelectorComponent;
