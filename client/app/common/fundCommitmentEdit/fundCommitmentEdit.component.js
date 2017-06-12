import template from './fundCommitmentEdit.html';
import controller from './fundCommitmentEdit.controller';
import './fundCommitmentEdit.styl';

let fundCommitmentEditComponent = {
  restrict: 'E',
  bindings: {fundId:'@', commitmentId:'@'},
  template,
  controller
};

export default fundCommitmentEditComponent;
