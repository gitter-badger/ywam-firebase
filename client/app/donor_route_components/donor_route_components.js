import angular from 'angular';

import donorPage from './donorPage/donorPage';
import donationCodePage from './donationCodePage/donationCodePage';

let componentModule = angular.module('donor.app.components', [
  donorPage,
  donationCodePage

])
  
.name;

export default componentModule;
