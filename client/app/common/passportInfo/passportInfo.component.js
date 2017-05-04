import template from './passportInfo.html';
import controller from './passportInfo.controller';
import './passportInfo.styl';

let passportInfoComponent = {
  restrict: 'E',
  bindings: { userId:"="},
  template,
  controller
};

export default passportInfoComponent;
