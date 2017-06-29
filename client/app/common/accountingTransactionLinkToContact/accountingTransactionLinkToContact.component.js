import template from './accountingTransactionLinkToContact.html';
import controller from './accountingTransactionLinkToContact.controller';
import './accountingTransactionLinkToContact.styl';

let accountingTransactionLinkToContactComponent = {
  restrict: 'E',
  bindings: {key:'='},
  template,
  controller
};

export default accountingTransactionLinkToContactComponent;
