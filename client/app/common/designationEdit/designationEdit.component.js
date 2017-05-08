import template from './designationEdit.html';
import controller from './designationEdit.controller';
import './designationEdit.styl';

let designationEditComponent = {
  restrict: 'E',
  bindings: {code:'@'},
  template,
  controller
};

export default designationEditComponent;
