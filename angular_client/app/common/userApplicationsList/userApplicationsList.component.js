import template from './userApplicationsList.html';
import controller from './userApplicationsList.controller';
import './userApplicationsList.styl';

let userApplicationsListComponent = {
  restrict: 'E',
  bindings: {banner:'=', userId:'='},
  template,
  controller
};

export default userApplicationsListComponent;
