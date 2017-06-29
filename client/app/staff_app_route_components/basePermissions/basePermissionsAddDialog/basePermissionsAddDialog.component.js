import template from './basePermissionsAddDialog.html';
import controller from './basePermissionsAddDialog.controller';
import './basePermissionsAddDialog.styl';

let basePermissionsAddDialogComponent = {
  restrict: 'E',
  bindings: {permissionId:'='},
  template,
  controller
};

export default basePermissionsAddDialogComponent;
