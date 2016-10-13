import angular from 'angular';
import SchoolFactory from './school.factory';

let schoolModule = angular.module('school', [])

.factory('School', SchoolFactory)
  
.name;

export default schoolModule;
