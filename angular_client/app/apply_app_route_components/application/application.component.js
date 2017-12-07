import template from './application.html';
import controller from './application.controller';
import './application.styl';

let applicationComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default applicationComponent;
