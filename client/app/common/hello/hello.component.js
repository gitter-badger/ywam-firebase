import template from './hello.html';
import controller from './hello.controller';
import './hello.styl';

let helloComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default helloComponent;
