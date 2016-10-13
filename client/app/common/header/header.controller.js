class HeaderController {
   /* @ngInject */
  constructor($translate,$mdSidenav, Auth, $state, Site) {

      var ctrl = this;
          ctrl.logout = ()=>{
            Auth.$signOut()
             $state.transitionTo('home')
          }
          ctrl.user = Site.user
          ctrl.presence = Site.presence

    // any time auth state changes, add the user data to scope
   Auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.firebaseUser = firebaseUser;
     
    });


      ctrl.langKey = $translate.proposedLanguage()  || 'en'
      ctrl.changeLanguage = function () {
        $translate.use(ctrl.langKey);
      };
      ctrl.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

  }
}

export default HeaderController;
