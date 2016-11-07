import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Translation from './translation/translation';
import translateSection from './translateSection/translateSection';

import SchoolsPage from './school/schoolsPage/schoolsPage';
import SchoolPage from './school/schoolPage/schoolPage';
import StudentList from './school/studentList/studentList';
import StudentPhotos from './school/studentPhotos/studentPhotos';
import SchoolSettings from './school/schoolSettings/schoolSettings';
import SchoolStaff from './school/schoolStaff/schoolStaff';

import accounting from './accounting/accounting';

import staff from './staff/staff'
import staffCurrent from './staffCurrent/staffCurrent'
import staffAlumni from './staffAlumni/staffAlumni';
import staffApps from './staffApps/staffApps';

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
  staffApps,

  siteSettings,
  permissions,
  profile

])
  
.name;

export default componentModule;
