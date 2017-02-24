import template from './referenceDisplay.html';
import controller from './referenceDisplay.controller';
import './referenceDisplay.styl';

let referenceDisplayComponent = {
  restrict: 'E',
  bindings: {key :'='},
  template,
  controller
};

export default referenceDisplayComponent;
