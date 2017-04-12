class HomeController {
   /* @ngInject */
  constructor($mdSidenav) {
  var ctrl = this;

    ctrl.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
  }
}

export default HomeController;
