import angular from 'angular';



import Header from './header/header';
import Sidenav from './sidenav/sidenav';
import LoginButtons from './loginButtons/loginButtons';
import LoginDialog from './loginDialog/loginDialog';
import signUp from './signUp/signUp';

import appStatus from './appStatus/appStatus';
import appStatusesSelector from './appStatusesSelector/appStatusesSelector';
import appFor from './appFor/appFor';
import refStatus from './refStatus/refStatus';
import contactInfo from './contactInfo/contactInfo';
import passportInfo from './passportInfo/passportInfo';
import userPhotoUpload from './userPhotoUpload/userPhotoUpload';
import userApplicationsList from './userApplicationsList/userApplicationsList';


//application form stuff
import healthForm from './healthForm/healthForm';
import passportInfoForm from './passportInfoForm/passportInfoForm';
import postalAddressForm from './postalAddressForm/postalAddress';
import languagesForm from './languagesForm/languages';
import refRequest from './refRequest/refRequest';
import applicationQuestionsForm from './applicationQuestionsForm/applicationQuestionsForm';
import emergencyContactForm from './emergencyContactForm/emergencyContactForm';
import contactInfoForm from './contactInfoForm/contactInfoForm';




//mostly used in staffapp
import appAdminNotes from './appAdminNotes/appAdminNotes';
import applicationQuestionAdminEdit from './applicationQuestionAdminEdit/applicationQuestionAdminEdit';
import referenceDisplay from './referenceDisplay/referenceDisplay';
import healthInfo from './healthInfo/healthInfo';
import siteTaskList from './siteTaskList/siteTaskList';
import roleCallsList from './roleCallsList/roleCallsList';
import roleCallMemberList from './roleCallMemberList/roleCallMemberList';
import baseProjectTaskEdit from './baseProjectTaskEdit/baseProjectTaskEdit';
import fundEdit from './fundEdit/fundEdit';



let commonModule = angular.module('app.common', [
  
 

<<<<<<< Updated upstream
    Header,
    Sidenav,
    LoginButtons,
    LoginDialog,
    signUp,

    appStatus,
    appStatusesSelector,
    appFor,
    refStatus,
    contactInfo,
    passportInfo,
    userPhotoUpload,
    userApplicationsList,

    healthForm,
    languagesForm,
    passportInfoForm,
    postalAddressForm,
    refRequest,
    schoolQuestionsForm,
    emergencyContactForm,
    contactInfoForm,

    appAdminNotes,
    applicationQuestionAdminEdit,
    healthInfo,
    referenceDisplay,
    siteTaskList,
    roleCallsList,
    roleCallMemberList,
    baseProjectTaskEdit,
    fundEdit
=======
   Header,
  Sidenav,
  LoginButtons,
  LoginDialog,
  signUp,

  appStatus,
  appStatusesSelector,
  appFor,
  refStatus,
  contactInfo,
  passportInfo,
  userPhotoUpload,
  userApplicationsList,

  healthForm,
  languagesForm,
  passportInfoForm,
  postalAddressForm,
  refRequest,
  applicationQuestionsForm,
  emergencyContactForm,

  appAdminNotes,
  applicationQuestionAdminEdit,
  healthInfo,
  referenceDisplay,
  siteTaskList,
  roleCallsList,
  roleCallMemberList,
  baseProjectTaskEdit,
  fundEdit
>>>>>>> Stashed changes


])
  
.name;

export default commonModule;
