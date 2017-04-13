import template from './languages.html';
import controller from './languages.controller';
import './languages.styl';

let languagesComponent = {
  restrict: 'E',
  bindings: {isValid:'='},
  template,
  controller
};

export default languagesComponent;
