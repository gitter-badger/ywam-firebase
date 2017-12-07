import template from './roleCallsList.html';
import controller from './roleCallsList.controller';
import './roleCallsList.styl';

let roleCallsListComponent = {
  restrict: 'E',
  bindings: { schoolId : '=',
              groupId : '='},
  template,
  controller
};

export default roleCallsListComponent;
