import template from './staffGroupAddMemberDialog.html';
import controller from './staffGroupAddMemberDialog.controller';
import './staffGroupAddMemberDialog.styl';

let staffGroupAddMemberDialogComponent = {
  restrict: 'E',
  bindings: {groupId:'@'},
  template,
  controller
};

export default staffGroupAddMemberDialogComponent;
