import template from './appFor.html';
import controller from './appFor.controller';
import './appFor.styl';

let appForComponent = {
  restrict: 'E',
  bindings: {appId:'=', link:'='},
  template,
  controller
};

export default appForComponent;
