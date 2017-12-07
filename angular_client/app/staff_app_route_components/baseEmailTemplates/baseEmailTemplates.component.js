import template from './baseEmailTemplates.html';
import controller from './baseEmailTemplates.controller';
import './baseEmailTemplates.styl';

let baseEmailTemplatesComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default baseEmailTemplatesComponent;
