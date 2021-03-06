import angular from 'angular';
import Home from './home/home';
import Translation from './translation/translation';
import translateSection from './translateSection/translateSection';

import SchoolsPage from './school/schoolsPage/schoolsPage';
import SchoolPage from './school/schoolPage/schoolPage';
import StudentList from './school/studentList/studentList';
import StudentPhotos from './school/studentPhotos/studentPhotos';
import SchoolSettings from './school/schoolSettings/schoolSettings';
import schoolStats from './school/schoolStats/schoolStats';
import schoolOutreach from './school/schoolOutreach/schoolOutreach';
import SchoolStaff from './school/schoolStaff/schoolStaff';
import schoolRoleCalls from './school/schoolRoleCalls/schoolRoleCalls';
import schoolRoleCall from './school/schoolRoleCall/schoolRoleCall';

import accounting from './accounting/accounting';
import accountingPaypalPage from './accountingPaypalPage/accountingPaypalPage';
import accountingPaypalEvents from './accountingPaypalEvents/accountingPaypalEvents';
import accountingStripeTransactions from './accountingStripeTransactions/accountingStripeTransactions';
import accountingStripeEvents from './accountingStripeEvents/accountingStripeEvents';
import accountingFunds from './accountingFunds/accountingFunds';
import accountingFundInfo from './accountingFundInfo/accountingFundInfo';
import accountingFundExpenses from './accountingFundExpenses/accountingFundExpenses';
import accountingFundRequests from './accountingFundRequests/accountingFundRequests';
import accountingAccounts from './accountingAccounts/accountingAccounts';
import accountingAccountsView from './accountingAccountsView/accountingAccountsView';
import accountingAccountsIncomeTransactions from './accountingAccountsIncomeTransactions/accountingAccountsIncomeTransactions';
import accountingAccountsExpenseTransactions from './accountingAccountsExpenseTransactions/accountingAccountsExpenseTransactions';
import accountingAccountsSettings from './accountingAccountsSettings/accountingAccountsSettings';

import adminMessages from './adminMessages/adminMessages';

import donors from './donors/donors';

import staff from './staff/staff'
import staffCurrent from './staffCurrent/staffCurrent'
import staffAlumni from './staffAlumni/staffAlumni';
import staffApps from './staffApps/staffApps';
import staffGroups from './staffGroups/staffGroups';
import staffGroupDetail from './staffGroupDetail/staffGroupDetail';

import siteSettings from './siteSettings/siteSettings';
import siteStats from './siteStats/siteStats';
import siteSecurity from './siteSecurity/siteSecurity';


import base from './base/base';
import baseInfo from './baseInfo/baseInfo';
import baseFundsHealth from './baseFundsHealth/baseFundsHealth';
import baseSetup from './baseSetup/baseSetup';
import baseNotices from './baseNotices/baseNotices';
import basePermissions from './basePermissions/basePermissions';
import baseVisaRequirements from './baseVisaRequirements/baseVisaRequirements';
import baseApplicationQuestions from './baseApplicationQuestions/baseApplicationQuestions';
import baseProjects from './baseProjects/baseProjects';
import baseBuildings from './baseBuildings/baseBuildings';
import baseHousing from './baseHousing/baseHousing';
import baseContacts from './baseContacts/baseContacts';
import baseContactsImport from './baseContactsImport/baseContactsImport';
import baseEmailTemplates from './baseEmailTemplates/baseEmailTemplates';


import Search from './search/search';


import ApplicationView from './applicationView/applicationView';
import forgotPassword from './forgotPassword/forgotPassword';

import prayerWall from './prayerWall/prayerWall';

let componentModule = angular.module('app.components', [
  Home,
 
  Translation,
  translateSection,
  SchoolsPage,
  SchoolPage,
  StudentList,
  StudentPhotos,
  schoolStats,
  schoolOutreach,
  SchoolSettings,
  SchoolStaff,
  schoolRoleCalls,
  schoolRoleCall,


  Search,
  ApplicationView,
  forgotPassword,
  
  prayerWall,
  accounting,
  accountingPaypalPage,
  accountingPaypalEvents,
  accountingStripeTransactions,
  accountingStripeEvents,

  accountingFunds,
  accountingFundInfo,
  accountingAccounts,
  accountingFundExpenses,
  accountingFundRequests,
  accountingAccountsView,
  accountingAccountsIncomeTransactions,
  accountingAccountsExpenseTransactions,
  accountingAccountsSettings,

  adminMessages,

  donors,

  staff,
  staffCurrent,
  staffAlumni,
  staffApps,
  staffGroups,
  staffGroupDetail,

  siteSettings,
  siteStats,
  siteSecurity,

  base,
  baseInfo,
  baseFundsHealth,
  baseSetup,
  baseNotices,
  basePermissions,
  baseProjects,
  baseBuildings,
  baseHousing,
  baseVisaRequirements,
  baseApplicationQuestions,
  baseContacts,
  baseContactsImport,
  baseEmailTemplates,

])
  
.name;

export default componentModule;
