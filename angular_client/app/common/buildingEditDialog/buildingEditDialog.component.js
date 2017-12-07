import template from './buildingEditDialog.html';
import controller from './buildingEditDialog.controller';
import './buildingEditDialog.styl';

let buildingEditDialogComponent = {
  restrict: 'E',
  bindings: {buildingId:"@"},
  template,
  controller
};

export default buildingEditDialogComponent;
