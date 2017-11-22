import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applicationComponent from './application.component';
// import moment from 'moment';
// import 'moment/locale/en-us';
// moment();
// import 'angular-moment-picker';
import 'angular-moment';

let applicationModule = angular.module('application', [
  uiRouter, "angularMoment"
  // "moment-picker"
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('apply.application', {
      url: '/application/:appId',
      component: 'application',
       resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our  wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
         // console.log( Auth.$waitForSignIn())
          return Auth.$waitForSignIn();
        }],
       
     }
    });
})
.component('application', applicationComponent)

.name;

export default applicationModule;
