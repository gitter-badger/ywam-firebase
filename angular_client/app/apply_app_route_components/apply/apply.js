import angular from 'angular';
import uiRouter from 'angular-ui-router';
import applyComponent from './apply.component';

let applyModule = angular.module('apply', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";



  $stateProvider
    .state('apply', {
      // url: '',
      component: 'apply',

      resolve:{
        
          "currentAuth":["Auth",function(Auth){
              return Auth.$waitForSignIn();
          }]
      }
    });
})

.component('apply', applyComponent)
  
.name;

export default applyModule;
