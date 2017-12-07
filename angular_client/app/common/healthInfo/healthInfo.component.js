import template from './healthInfo.html';
import controller from './healthInfo.controller';
import './healthInfo.styl';

let healthInfoComponent = {
  restrict: 'E',
  bindings:  {userId : '='},
  template,
  controller
};

export default healthInfoComponent;
