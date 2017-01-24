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
import appAdminNotes from './appAdminNotes/appAdminNotes';
import referenceDisplay from './referenceDisplay/referenceDisplay';

import contactInfo from './contactInfo/contactInfo';
import healthInfo from './healthInfo/healthInfo';

import siteTaskList from './siteTaskList/siteTaskList';

import userPhotoUpload from './userPhotoUpload/userPhotoUpload';
import roleCallsList from './roleCallsList/roleCallsList';
import roleCallMemberList from './roleCallMemberList/roleCallMemberList';
import baseProjectTaskEdit from './baseProjectTaskEdit/baseProjectTaskEdit';

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

  appStatus,
  appAdminNotes,
  contactInfo,
  healthInfo,
  referenceDisplay,

  siteTaskList,

  userPhotoUpload,
  roleCallsList,
  roleCallMemberList,
  baseProjectTaskEdit



])
  
.name;

export default commonModule;
