import angular from 'angular';
import uiRouter from 'angular-ui-router';
import prayerWallComponent from './prayerWall.component';


let prayerWallModule = angular.module('prayerWall', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('prayer', {
      url: '/prayer',
      component: 'prayerWall',
      //  data: {authRequired:true},
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
.component('prayerWall', prayerWallComponent)

.name;

export default prayerWallModule;
