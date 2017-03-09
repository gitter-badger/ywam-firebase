class SchoolRoleCallController {
   /* @ngInject */
  constructor( $stateParams) {
    var ctrl = this
        ctrl.roleCallId =  $stateParams.roleCallId
  }
}

export default SchoolRoleCallController;
