class HeaderController {
   /* @ngInject */
  constructor($translate, Auth, Site,$state,$stateParams,$mdSidenav ) {

      var ctrl = this;
      ctrl.$onInit= onInit;
      ctrl.langKey = $translate.proposedLanguage()  || 'en' //get the current language
      ctrl.site = Site;
      ctrl.user = Site.user
      ctrl.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
      
      
      
      function onInit(){
          
     
      ctrl.presence = Site.presence
    //  ctrl.avatars = Site.avatars
      
      ctrl.changeLanguage = function (langKey) {
          $translate.use(langKey);
          ctrl.langKey=langKey
      };
     ctrl.logout = ()=>{
            Auth.$signOut()
             $state.go('apply.schoolList')
          }

           
      
   
}
  
  // any time auth state changes, add the user data to scope
   Auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.firebaseUser = firebaseUser;
    });





  }
}

export default HeaderController;
