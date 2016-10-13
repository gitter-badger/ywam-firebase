import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

//Material Design 
import 'angular-material'
require('angular-material/angular-material.css');
import DataTable from 'angular-material-data-table';
require('angular-material-data-table/dist/md-data-table.css')

//Font Awsome
// require('font-awesome/css/font-awesome.css');
require("font-awesome-webpack");

//angular translate 
import 'angular-translate';
import 'angular-translate-loader-static-files';
import English from './en.json'; //include english translations by default so they don't have to load seperate 

import Domains from './domains.json'


//Firebase libraries
import 'firebase';
// import 'firebase-util'; // this will be useful once it supports the 3.0 SDK
import 'angularfire';



angular.module('app', [
    uiRouter,
    'ngMaterial',
    DataTable,
    'pascalprecht.translate',//ngTranslate
    'firebase',
    Common,
    Components
  ])
  .config(($locationProvider, $translateProvider, $mdThemingProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true).hashPrefix('!');

//------  Angular Translate Settings
      $translateProvider
       .translations('en', English)
        .useStaticFilesLoader({
          prefix: 'https://staffapp-95f17.firebaseio.com/phrases/',
          suffix: '.json'})
        .registerAvailableLanguageKeys(['en','de','es'],{
          'en_*': 'en',
          'de_*': 'de',
          'es_*': 'es',
          '*': 'en'
        })
        .determinePreferredLanguage()
        .fallbackLanguage('en');

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


//------- Initialize Firebase
        var config = {
          apiKey: "AIzaSyBSBD_FNaMQZyd3h0mcv0ZMUt9QXY2m3f4",
          authDomain: "staffapp-95f17.firebaseapp.com",
          databaseURL: "https://staffapp-95f17.firebaseio.com",
          storageBucket: "staffapp-95f17.appspot.com",
        };
        firebase.initializeApp(config);



  })
  .run((Site)=>{ //Find location from host names
     "ngInject";
            Site.location_id  =  Domains[location.hostname]
        if(!Site.location_id)
        console.warn('No location matching domain '+ location.hostname)
  })


.run(["$transitions", "Auth" ,"$rootScope", function($transitions, Auth, $rootScope) {
//Catch pages that need login
$transitions.onStart({
    to: function (state) {

        if( state.data != null && state.data.authRequired === true && !Auth.$getAuth()){
         
           $rootScope.$broadcast('showLoginDialog');
          // $timeout(function(){})
          console.log("Not LOGGED in")
        }
  

    }
})
}])
  .component('app', AppComponent);
