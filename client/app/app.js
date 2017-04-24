import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Common from './common/common';
import services from './services/services';
import staffComponents from './staff_app_route_components/staff_app_route_components';
import applyComponents from './apply_app_route_components/apply_app_route_components';
import AppComponent from './app.component';

import 'normalize.css';

//Material Design 
import 'angular-material'
require('angular-material/angular-material.css');

// Material Data Table
import DataTable from 'angular-material-data-table';
require('angular-material-data-table/dist/md-data-table.css')


import 'chart.js'
import 'angular-chart.js'

//Font Awsome
// require('font-awesome/css/font-awesome.css');
require("font-awesome-webpack");

//angular translate 
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-translate-loader-partial';
import 'angular-dynamic-locale'; // for dynamic locale loading 
import 'angular-moment';
import English from './en.json'; //include english translations by default so they don't have to load seperate 

import Domains from './domains.json'


//Firebase libraries
import  firebase from 'firebase';
window.firebase = firebase //angularfire expects firebase as a global varible for some reason?
// import 'firebase-util'; // this will be useful once it supports the 3.0 SDK
import 'angularfire';




angular.module('app', [
    uiRouter,
    'ngMaterial',
    DataTable,
    'pascalprecht.translate',//ngTranslate
     'tmh.dynamicLocale',// for dynamic locale loading 
     'angularMoment',
    'firebase',
     'chart.js',
    Common,
    services,
    staffComponents,
    applyComponents
  ])
  .config(($locationProvider, $translateProvider, $mdThemingProvider,$urlRouterProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true).hashPrefix('!');
    

    $urlRouterProvider.otherwise('/schoolApplyList');

    firebase.initializeApp(window.firebaseConfig);




    //------ Material Design Theme config  

    var YWAMSarasotaColorPalettePrimary = {
        '50': '#a2ded2',
        '100': '#8fd8c9',
        '200': '#7dd1c0',
        '300': '#6acab6',
        '400': '#57c4ad',
        '500': '#44BDA4',
        '600': '#3cab94',
        '700': '#369884',
        '800': '#2f8574',
        '900': '#287363',
        'A100': '#b5e5db',
        'A200': '#c8ece4',
        'A400': '#dbf2ed',
        'A700': '#226053',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

         'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
         'contrastLightColors': undefined    // could also specify this if default was 'dark'
    };
    $mdThemingProvider
        .definePalette('YWAMSarasotaColorPalettePrimary', 
                        YWAMSarasotaColorPalettePrimary);

    var YWAMSarasotaColorPaletteAccent = {
        '50': '#bc420a',
        '100': '#d44a0b',
        '200': '#ec530d',
        '300': '#f3621f',
        '400': '#f47338',
        '500': '#f68450',
        '600': '#f8a680',
        '700': '#fab798',
        '800': '#fbc8b1',
        '900': '#fcd9c9',
        'A100': '#f8a680',
        'A200': '#F79568',
        'A400': '#f68450',
        'A700': '#fdeae1'
    };
    $mdThemingProvider
        .definePalette('YWAMSarasotaColorPaletteAccent', 
                        YWAMSarasotaColorPaletteAccent);

    var YWAMSarasotaColorPaletteWarn = {
        '50': '#fcdbdb',
        '100': '#fac3c4',
        '200': '#f7acad',
        '300': '#f59595',
        '400': '#f37d7e',
        '500': '#F16667',
        '600': '#ef4f50',
        '700': '#ed3739',
        '800': '#eb2021',
        '900': '#dd1416',
        'A100': '#fef2f2',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#c51213'
    };
    $mdThemingProvider
        .definePalette('YWAMSarasotaColorPaletteWarn', 
                        YWAMSarasotaColorPaletteWarn);

   $mdThemingProvider.theme('default')
       .primaryPalette('YWAMSarasotaColorPalettePrimary')
       .accentPalette('YWAMSarasotaColorPaletteAccent')
       .warnPalette('YWAMSarasotaColorPaletteWarn')
       .backgroundPalette('grey')


     

  })
  //Translation config
.config(($translateProvider,$translatePartialLoaderProvider ,tmhDynamicLocaleProvider) => {
    "ngInject";
  
     $translatePartialLoaderProvider.addPart('apply-app');
      $translateProvider.useLoader('$translatePartialLoader',{
          urlTemplate: 'https://staffapp-95f17.firebaseio.com/phrases/{part}/{lang}.json',
         })
        .registerAvailableLanguageKeys(['en','de','es'],{
          'en_*': 'en',
          'de_*': 'de',
          'es_*': 'es',
          '*': 'en'
        })
        .determinePreferredLanguage()
        .fallbackLanguage('en')
        .useSanitizeValueStrategy('sanitizeParameters')
        .useLoaderCache(true)
        //---------- locale settings... load from https://cdnjs.com/libraries/angular-i18n
    tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.5.8/angular-locale_{{locale}}.js');


})



  .run(($rootScope,$translate,tmhDynamicLocale, Site
  )=>{
      "ngInject";
    $rootScope.$on('$translateChangeSuccess', function() {
     //Watching for angular-translate changes.. and change the angular-locale also
       console.log('Changing language and locale to ' + $translate.proposedLanguage())
      //  if($translate.proposedLanguage()!='en')// ignore english since it is already in angular
        tmhDynamicLocale.set($translate.proposedLanguage());
        
        Site.language = $translate.proposedLanguage();
    });


  })

.run(["$transitions", "Auth" ,"$rootScope","$state","$location" , function($transitions, Auth, $rootScope,$state,$location) {
//Catch pages that need login
$transitions.onStart({
    to: function (state) {

        //Things to reset on every state transtion
          $rootScope.$broadcast('hideLoginDialog');


        if( state.data != null ){
          

          
         if(state.data.authRequired === true && !Auth.$getAuth()){
            $rootScope.$broadcast('showLoginDialog');
            // $timeout(function(){})
            console.log("Not LOGGED in")
         }
          
        }
  
    },
    from:function(state){
        //set previous state
    //   
        // console.log( $location.path())
        $state.previous = $location.path()
     
       console.log( $state.previous)
    }
})
}])
  .component('app', AppComponent);
