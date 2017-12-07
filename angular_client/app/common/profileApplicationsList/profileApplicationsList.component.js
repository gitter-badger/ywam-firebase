import template from './profileApplicationsList.html';
import controller from './profileApplicationsList.controller';
import './profileApplicationsList.styl';

let profileApplicationsListComponent = {
  restrict: 'E',
  bindings: {userId:'='},
  template,
  controller
};

export default profileApplicationsListComponent;
