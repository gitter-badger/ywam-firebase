import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseApplicationQuestionsComponent from './baseApplicationQuestions.component';

let baseApplicationQuestionsModule = angular.module('baseApplicationQuestions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.applicationQuestions', {
      url: '/applicationQuestions',
      component: 'baseApplicationQuestions'
    });
})
.component('baseApplicationQuestions', baseApplicationQuestionsComponent)

.name;

export default baseApplicationQuestionsModule;
