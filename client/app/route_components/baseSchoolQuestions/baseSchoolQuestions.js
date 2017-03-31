import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseSchoolQuestionsComponent from './baseSchoolQuestions.component';

let baseSchoolQuestionsModule = angular.module('baseSchoolQuestions', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.schoolQuestions', {
      url: '/schoolQuestions',
      component: 'baseSchoolQuestions'
    });
})
.component('baseSchoolQuestions', baseSchoolQuestionsComponent)

.name;

export default baseSchoolQuestionsModule;
