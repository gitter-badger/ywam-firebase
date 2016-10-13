import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Translation from './translation/translation';
import translateSection from './translateSection/translateSection';
import SchoolsPage from './schoolsPage/schoolsPage';
import SchoolPage from './schoolPage/schoolPage';
import StudentList from './studentList/studentList';
import StudentPhotos from './studentPhotos/studentPhotos';
import SchoolSettings from './schoolSettings/schoolSettings';
import SchoolStaff from './schoolStaff/schoolStaff';
import accounting from './accounting/accounting';

import staff from './staff/staff'
import staffCurrent from './staffCurrent/staffCurrent'
import staffAlumni from './staffAlumni/staffAlumni';

import siteSettings from './siteSettings/siteSettings';
import permissions from './permissions/permissions';

import Search from './search/search';
import profile from './profile/profile';

import ApplicationView from './applicationView/applicationView';
import forgotPassword from './forgotPassword/forgotPassword';
import prayerWall from './prayerWall/prayerWall';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Translation,
  translateSection,
  SchoolsPage,
  SchoolPage,
  StudentList,
  StudentPhotos,
  SchoolSettings,
  SchoolStaff,
  Search,
  ApplicationView,
  forgotPassword,
  prayerWall,
  accounting,
  staff,
  staffCurrent,
  staffAlumni,
  siteSettings,
  permissions,
  profile

])
  
.name;

export default componentModule;
