import template from './passportInfoForm.html';
import controller from './passportInfoForm.controller';
import './passportInfoForm.styl';

let passportInfoComponent = {
  restrict: 'E',
  bindings: { isValid :'=?',
                userId:"="
            },
  template,
  controller
};

export default passportInfoComponent;
