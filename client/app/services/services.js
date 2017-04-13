import angular from 'angular';
import Auth from './auth/auth'; //service
import User from './user/user';
import School from './school/school'; //service
import Site from './site/site'




let commonModule = angular.module('app.services', [
  
  User,
  Auth,
  School,
  Site,

])
  
.name;

export default commonModule;
