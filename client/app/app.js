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

        $mdThemingProvider.definePalette('YWAMSarasotaColorPalette', {
        '50': 'a6efe0',
        '100': '94ecda',
        '200': '82e9d4',
        '300': '70e6ce',
        '400': '5ee3c8',
        
        '500': '4de0c2',
      
        '600': '45c9ae',
        '700': '3db39b',
        '800': '359c87',
        '900': '2e8674',
        'A100': '7e7e7c',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'b0b0b0',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });



      $mdThemingProvider.theme('default')
         .primaryPalette('YWAMSarasotaColorPalette')
         .accentPalette('YWAMSarasotaColorPalette')
          // .primaryPalette('blue-grey')
          // .accentPalette('amber', {
          // 'default': '500', // by default use shade 400 from the pink palette for primary intentions
          // 'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          // 'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          // 'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
          // })
          .backgroundPalette('grey');

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



  .run(($rootScope,$translate,tmhDynamicLocale, Site)=>{
      "ngInject";
    $rootScope.$on('$translateChangeSuccess', function() {
     //Watching for angular-translate changes.. and change the angular-locale also
       console.log('Changing language and locale to ' + $translate.proposedLanguage())
      //  if($translate.proposedLanguage()!='en')// ignore english since it is already in angular
        tmhDynamicLocale.set($translate.proposedLanguage());
        
        Site.language = $translate.proposedLanguage();
    });


  })

  .run((Site,$firebaseObject, $rootScope)=>{ //Find location from host names
     "ngInject";
            // Site.location_id  =  Domains[location.hostname]
            // $rootScope.location_id = Site.location_id
        var Ref = firebase.database().ref('location_public')
            Site.location = $firebaseObject(Ref)
        // if(!Site.location_id)
        // console.warn('No location matching domain '+ location.hostname)
  })


.run(["$transitions", "Auth" ,"$rootScope","$state","Site" , function($transitions, Auth, $rootScope,$state, Site) {
//Catch pages that need login
$transitions.onStart({
    to: function (state) {

        //Things to reset on every state transtion
          $rootScope.$broadcast('hideLoginDialog');
          Site.hideSideNav = false;

        if( state.data != null ){
          
          if(state.data.hideSideNav)
             Site.hideSideNav=true
          
         if(state.data.authRequired === true && !Auth.$getAuth()){
            $rootScope.$broadcast('showLoginDialog');
            // $timeout(function(){})
            console.log("Not LOGGED in")
         }
          
        }
  
    },
    from:function(state){
        //set previous state
        //console.log(state.name)
        $state.previous = { name : $state.current.name, 
                            params: $state.params
                          }
     
       // console.log($state.previous.name)
    }
})
}])
  .component('app', AppComponent);
