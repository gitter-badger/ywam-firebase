import template from './refRequest.html';
import controller from './refRequest.controller';
import './refRequest.styl';

let refRequestComponent = {
  restrict: 'E',
  bindings: {appId: '=', isValid:'=', userId:"="},
  template,
  controller
};

export default refRequestComponent;
