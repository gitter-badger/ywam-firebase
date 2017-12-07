import angular from 'angular';
import uiRouter from 'angular-ui-router';
import accountingAccountsComponent from './accountingAccounts.component';
import angularLoad from 'angular-load'

let accountingAccountsModule = angular.module('accountingAccounts', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('accounting.accounts', {
      url: '/accounts',
      component: 'accountingAccounts',
      // resolve: {'script': ['angularLoad', function(angularLoad){
        
      // return  angularLoad.loadScript('https://cdn.plaid.com/link/v2/stable/link-initialize.js').then(function() {
      //     // Script loaded succesfully.
      //     // We can now start using the functions from someplugin.js
      //     console.log('script loaded')
      //    return 
      //   }).catch(function() {
      //       // There was some error loading the script. Meh
      //   })
      
      // }]

      // }
     
      
    });
})
.component('accountingAccounts', accountingAccountsComponent)

.name;

export default accountingAccountsModule;
