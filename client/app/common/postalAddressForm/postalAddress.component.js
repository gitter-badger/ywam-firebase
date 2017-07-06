import template from './postalAddress.html';
import controller from './postalAddress.controller';
import './postalAddress.styl';

let postalAddressComponent = {
  restrict: 'E',
  bindings: {isValid :'=?'},
  template,
  controller
};

export default postalAddressComponent;
