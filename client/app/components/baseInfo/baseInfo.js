import angular from 'angular';
import uiRouter from 'angular-ui-router';
import baseInfoComponent from './baseInfo.component';

let baseInfoModule = angular.module('baseInfo', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('base.info', {
      url: '/info',
      component: 'baseInfo'
    });
})

.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
})

.component('baseInfo', baseInfoComponent)


.name;

export default baseInfoModule;
