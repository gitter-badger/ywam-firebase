import template from './base.html';
import controller from './base.controller';
import './base.styl';

let baseComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default baseComponent;
