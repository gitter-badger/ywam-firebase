import template from './emergencyContact.html';
import controller from './emergencyContact.controller';
import './emergencyContact.styl';

let emergencyContactComponent = {
  restrict: 'E',
  bindings: {isValid :'=?',
                userId:"@"},
  template,
  controller
};

export default emergencyContactComponent;
