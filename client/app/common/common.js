import angular from 'angular';



import Header from './header/header';
import Sidenav from './sidenav/sidenav';
import LoginButtons from './loginButtons/loginButtons';
import LoginDialog from './loginDialog/loginDialog';
import signUp from './signUp/signUp';

import appStatus from './appStatus/appStatus';
import appFor from './appFor/appFor';
import refStatus from './refStatus/refStatus';
import contactInfo from './contactInfo/contactInfo';
import userPhotoUpload from './userPhotoUpload/userPhotoUpload';
import userApplicationsList from './userApplicationsList/userApplicationsList';


//application form stuff
import healthForm from './healthForm/healthForm';
import passportInfoForm from './passportInfoForm/passportInfo';
import postalAddressForm from './postalAddressForm/postalAddress';
import languagesForm from './languagesForm/languages';
import refRequest from './refRequest/refRequest';
import schoolQuestionsForm from './schoolQuestionsForm/schoolQuestionsForm';
import emergencyContactForm from './emergencyContactForm/emergencyContactForm';




//mostly used in staffapp
import appAdminNotes from './appAdminNotes/appAdminNotes';
import referenceDisplay from './referenceDisplay/referenceDisplay';
import healthInfo from './healthInfo/healthInfo';
import siteTaskList from './siteTaskList/siteTaskList';
import roleCallsList from './roleCallsList/roleCallsList';
import roleCallMemberList from './roleCallMemberList/roleCallMemberList';
import baseProjectTaskEdit from './baseProjectTaskEdit/baseProjectTaskEdit';



let commonModule = angular.module('app.common', [
  
 

  Header,
  Sidenav,
  LoginButtons,
  LoginDialog,
  signUp,

  appStatus,
  appFor,
  refStatus,
  contactInfo,
  userPhotoUpload,
  userApplicationsList,

  healthForm,
  languagesForm,
  passportInfoForm,
  postalAddressForm,
  refRequest,
  schoolQuestionsForm,
  emergencyContactForm,

  appAdminNotes,
  healthInfo,
  referenceDisplay,
  siteTaskList,
  roleCallsList,
  roleCallMemberList,
  baseProjectTaskEdit,



])
  
.name;

export default commonModule;
