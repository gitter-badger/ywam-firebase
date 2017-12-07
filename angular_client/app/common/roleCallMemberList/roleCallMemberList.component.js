import template from './roleCallMemberList.html';
import controller from './roleCallMemberList.controller';
import './roleCallMemberList.styl';

let roleCallMemberListComponent = {
  restrict: 'E',
  bindings: { roleCallId : '=?'},
  template,
  controller
};

export default roleCallMemberListComponent;
