import template from './contactManagementCard.html';
import controller from './contactManagementCard.controller';
import './contactManagementCard.styl';

let contactManagementCardComponent = {
  restrict: 'E',
  bindings: {userId:'='},
  template,
  controller
};

export default contactManagementCardComponent;
