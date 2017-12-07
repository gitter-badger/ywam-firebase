import template from './refStatus.html';
import controller from './refStatus.controller';
import './refStatus.styl';

let refStatusComponent = {
  restrict: 'E',
  bindings: { key : '=',
              date : '=',
              who: '='},
  template,
  controller
};

export default refStatusComponent;
