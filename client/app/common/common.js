import angular from 'angular';
import Auth from './auth/auth'; //service
import User from './user/user';
import School from './school/school'; //service
import Site from './site/site'

// import Navbar from './navbar/navbar';
// import Hero from './hero/hero';
import Header from './header/header';
import Sidenav from './sidenav/sidenav';
import LoginButtons from './loginButtons/loginButtons';
import LoginDialog from './loginDialog/loginDialog';

import appStatus from './appStatus/appStatus';


let commonModule = angular.module('app.common', [
  // Navbar,
  // Hero,
  User,
  Auth,
  School,
  Site,

  Header,
  Sidenav,
  LoginButtons,
  LoginDialog,

  appStatus

])
  
.name;

export default commonModule;
