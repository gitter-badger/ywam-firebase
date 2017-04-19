class StudentPhotosController {
  /* @ngInject */
  constructor(School,$stateParams, $mdMedia, Site,$firebaseObject, $timeout ) {
      var ctrl = this;
      var school_id = $stateParams.school_id;
          ctrl.apps =  School.getApps(school_id, true)
       
          ctrl.print = print

      var school_ref = firebase.database().ref('/schools/'+school_id + '/public')

          ctrl.school = $firebaseObject(school_ref);
        
          ctrl.photo_size = 150;
           if($mdMedia('xs'))
            ctrl.photo_size = 90;
         
         

function print(size){

  if(size =='letter'){
      ctrl.photo_size = 113;
      ctrl.photosPerPage = 24;
      $timeout(function(){  window.print();})
     
  }
if(size =='A4'){
      ctrl.photo_size = 130;
      ctrl.photosPerPage = 24;
      $timeout(function(){  window.print();})
     
  }


}



  }
}

export default StudentPhotosController;
