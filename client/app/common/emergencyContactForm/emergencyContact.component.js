import template from './emergencyContact.html';
import controller from './emergencyContact.controller';
import './emergencyContact.styl';

let emergencyContactComponent = {
  restrict: 'E',
  bindings: {isValid :'='},
  template,
  controller
};

export default emergencyContactComponent;
