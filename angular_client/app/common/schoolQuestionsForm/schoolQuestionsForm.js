import angular from 'angular';
import uiRouter from 'angular-ui-router';
import schoolQuestionsComponent from './schoolQuestions.component';

let schoolQuestionsModule = angular.module('schoolQuestions', [
  uiRouter
])

.component('schoolQuestions', schoolQuestionsComponent)

.name;

export default schoolQuestionsModule;
