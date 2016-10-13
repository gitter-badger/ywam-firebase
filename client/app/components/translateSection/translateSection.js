import angular from 'angular';
import uiRouter from 'angular-ui-router';
import translateSectionComponent from './translateSection.component';
// import 'ng-content-editable';

let translateSectionModule = angular.module('translateSection', [
  uiRouter,
  // "content-editable"
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('translateSection', {
      url: '/translateSection/:section',
      component: 'translateSection'
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
.component('translateSection', translateSectionComponent)

.name;

export default translateSectionModule;
