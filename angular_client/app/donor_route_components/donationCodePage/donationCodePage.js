import angular from 'angular';
import uiRouter from 'angular-ui-router';
import donationCodePageComponent from './donationCodePage.component';

let donationCodePageModule = angular.module('donationCodePage', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('donor.supportPage', {
      url: '/support/:donationCode',
      component: 'donationCodePage'
    });
})
.component('donationCodePage', donationCodePageComponent)

.name;

export default donationCodePageModule;
