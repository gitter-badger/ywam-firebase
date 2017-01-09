class SchoolSettingsController {
  /* @ngInject */
  constructor(School, $stateParams, $scope , $timeout, Site) {
    var ctrl = this;
        ctrl.savePhoto = savePhoto
        ctrl.toggle_mini_outreach  = toggle_mini_outreach
        ctrl.toggle_outreach  = toggle_outreach
        ctrl.myImage= '';//$firebaseObject(avatar_ref)
        ctrl.myCroppedImage='';
        ctrl.location = Site.location
       

    var school_id = $stateParams.school_id

       School.getSchool(school_id).$bindTo($scope, "public");

      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

       function toggle_mini_outreach(){
          if(!$scope.public.mini_outreach){
            $scope.public.mini_outreach_start_date = null;
            $scope.public.mini_outreach_end_date = null;
          }        }

         function toggle_outreach(){
          if(!$scope.public.outreach){
            $scope.public.outreach_start_date = null;
            $scope.public.outreach_end_date = null;
          }        }  


        function handleFileSelect(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              ctrl.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
         
        };

        function savePhoto(){
    
     ctrl.upload_progress = 1

        // Create a root reference
      var storageRef = firebase.storage().ref('/schools_public/'+school_id);
      var banner_ref =   firebase.database().ref('/schools/' +school_id ).child('public/banner_1080');

      var file =  ctrl.myCroppedImage
      // console.log(file)

     var uploadTask = storageRef.child('banner_1080.jpg' ).put(file);

            // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      $timeout(function () {
                     ctrl.upload_progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      })
                
                    console.log('Upload is ' + ctrl.upload_progress + '% done');
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }  
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          console.log('finished upload: ' +downloadURL)

          //Save the URL to users profile
       
              banner_ref.set(downloadURL);
    

        });
        }//end savePhoto function


  }
}

export default SchoolSettingsController;
