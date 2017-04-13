import angular from 'angular';
import uiRouter from 'angular-ui-router';
import referenceFormComponent from './referenceForm.component';

let referenceFormModule = angular.module('referenceForm', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('referenceForm', {
      url: '/referenceForm/:hash',
      component: 'referenceForm',
      data:{hideHeaderLinks:true},
       resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        // "currentAuth": ["Auth", function(Auth) {
        //   // $waitForSignIn returns a promise so the resolve waits for it to complete
        //  // console.log( Auth.$waitForSignIn())
        //   return Auth.$waitForSignIn();
        // }],
       
     }
    });
})
.component('referenceForm', referenceFormComponent)

.name;

export default referenceFormModule;
