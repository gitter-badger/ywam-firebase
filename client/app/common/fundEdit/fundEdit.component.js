import template from './fundEdit.html';
import controller from './fundEdit.controller';
import './fundEdit.styl';

let fundEditComponent = {
  restrict: 'E',
  bindings: {code:'@'},
  template,
  controller
};

export default fundEditComponent;
