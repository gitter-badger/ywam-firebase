import template from './contactInfoForm.html';
import controller from './contactInfoForm.controller';
import './contactInfoForm.styl';

let contactInfoFormComponent = {
  restrict: 'E',
  bindings: {isValid :'=?',
                userId:"@"},
  template,
  controller
};

export default contactInfoFormComponent;
