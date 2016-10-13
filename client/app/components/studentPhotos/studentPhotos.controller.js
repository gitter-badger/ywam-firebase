class StudentPhotosController {
  /* @ngInject */
  constructor(School,$stateParams) {
      var ctrl = this;
      var school_id = $stateParams.school_id;
          ctrl.apps =  School.getApps(school_id, true)
          ctrl.photo_size = 150;
  }
}

export default StudentPhotosController;
