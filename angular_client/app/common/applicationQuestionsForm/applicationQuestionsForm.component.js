import template from './applicationQuestionsForm.html';
import controller from './applicationQuestionsForm.controller';
import './applicationQuestionsForm.styl';

let applicationQuestionsFormComponent = {
  restrict: 'E',
  bindings: {appId:'=', schoolId:'=', isValid:'=', appType:'=' },
  template,
  controller
};

export default applicationQuestionsFormComponent;
