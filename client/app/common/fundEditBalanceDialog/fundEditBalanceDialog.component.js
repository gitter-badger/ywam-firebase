import template from './fundEditBalanceDialog.html';
import controller from './fundEditBalanceDialog.controller';
import './fundEditBalanceDialog.styl';

let fundEditBalanceDialogComponent = {
  restrict: 'E',
  bindings: {fundId:'@'},
  template,
  controller
};

export default fundEditBalanceDialogComponent;
