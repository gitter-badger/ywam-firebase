import template from './applicationQuestionAdminEdit.html';
import controller from './applicationQuestionAdminEdit.controller';
import './applicationQuestionAdminEdit.styl';

let applicationQuestionAdminEditComponent = {
  restrict: 'E',
  bindings: {questionId:'@', //one way binding 
            },
  template,
  controller
};

export default applicationQuestionAdminEditComponent;
