import angular from 'angular';
import uiRouter from 'angular-ui-router';
import studentListComponent from './studentList.component';

let studentListModule = angular.module('studentList', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('school.studentList', {
      url: '/studentList',
      component: 'studentList',
    })
    .state('school.application', {
    url:'/application/:app_id/',
    component:'applicationView' ,
   
  })

})


.component('studentList', studentListComponent)

.name;

export default studentListModule;
