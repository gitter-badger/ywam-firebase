import angular from 'angular';
import SiteFactory from './site.factory';

let siteModule = angular.module('site', [])

.factory('Site', SiteFactory)
  
.name;

export default siteModule;
