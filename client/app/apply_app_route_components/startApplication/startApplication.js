import angular from 'angular';
import uiRouter from 'angular-ui-router';
import startApplicationComponent from './startApplication.component';

let startApplicationModule = angular.module('startApplication', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('start', {
      url: '/start/:app_for',
      component: 'startApplication',
       data: {hideSideNav:true},
       resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
    });
})
.component('startApplication', startApplicationComponent)

.name;

export default startApplicationModule;
