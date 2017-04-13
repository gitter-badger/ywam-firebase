import template from './schoolQuestions.html';
import controller from './schoolQuestions.controller';
import './schoolQuestions.styl';

let schoolQuestionsComponent = {
  restrict: 'E',
  bindings: {appId:'=', schoolId:'='},
  template,
  controller
};

export default schoolQuestionsComponent;
