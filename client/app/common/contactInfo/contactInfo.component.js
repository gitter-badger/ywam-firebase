import template from './contactInfo.html';
import controller from './contactInfo.controller';
import './contactInfo.styl';

let contactInfoComponent = {
  restrict: 'E',
  bindings: {userId : '='},
  template,
  controller
};

export default contactInfoComponent;
