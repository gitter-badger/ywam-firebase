// import Firebase from 'firebase-util';

class ApplyController {
   /* @ngInject */
  constructor($rootScope,$state, Site) {
          var ctrl = this;  
              ctrl.site = Site
 
 $rootScope.$on('$viewContentLoaded',function(){ ctrl.current = $state.current.name})
      
  }
}

export default ApplyController;
