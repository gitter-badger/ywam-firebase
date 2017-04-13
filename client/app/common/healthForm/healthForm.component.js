import template from './healthForm.html';
import controller from './healthForm.controller';
import './healthForm.styl';

let healthFormComponent = {
  restrict: 'E',
  bindings: {isValid:'='},
  template,
  controller
};

export default healthFormComponent;
