class StaffController {
   /* @ngInject */
  constructor($rootScope,$state) {
    var ctrl = this;
    $rootScope.$on('$viewContentLoaded',function(){ ctrl.current = $state.current.name})

}
}

export default StaffController;
