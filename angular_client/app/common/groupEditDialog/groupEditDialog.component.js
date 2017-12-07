import template from './groupEditDialog.html';
import controller from './groupEditDialog.controller';
import './groupEditDialog.styl';

let groupEditDialogComponent = {
  restrict: 'E',
  bindings: {groupId:'@'},
  template,
  controller
};

export default groupEditDialogComponent;
