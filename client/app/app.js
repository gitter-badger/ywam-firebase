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

//------- Initialize Firebase
        var config = {
          apiKey: "AIzaSyBSBD_FNaMQZyd3h0mcv0ZMUt9QXY2m3f4",
          authDomain: "staffapp-95f17.firebaseapp.com",
          databaseURL: "https://staffapp-95f17.firebaseio.com",
          storageBucket: "staffapp-95f17.appspot.com",
        };
        firebase.initializeApp(config);




//------ Material Design Theme config        
      $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey')
          .accentPalette('amber', {
          'default': '500', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
          })
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
            Site.location_id  =  Domains[location.hostname]
            $rootScope.location_id = Site.location_id
        var Ref = firebase.database().ref('locations_public/'+Site.location_id)
            Site.location = $firebaseObject(Ref)
        if(!Site.location_id)
        console.warn('No location matching domain '+ location.hostname)
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
