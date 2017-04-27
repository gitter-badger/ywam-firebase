class SchoolSettingsController {
  /* @ngInject */
  constructor(School, $stateParams, $scope , $timeout, Site, $firebaseObject,moment) {
    var ctrl = this;
        ctrl.savePhoto = savePhoto
        ctrl.toggle_mini_outreach  = toggle_mini_outreach
        ctrl.toggle_outreach  = toggle_outreach
        ctrl.myImage= '';//$firebaseObject(avatar_ref)
        ctrl.myCroppedImage='';
        ctrl.location = Site.location
        ctrl.dates ={}
        ctrl.changeDate = changeDate
       
  

        ctrl.school_id = $stateParams.school_id

       School.getSchool(ctrl.school_id).$bindTo($scope, "public");
      
      var ref = firebase.database().ref('/schools/'+ctrl.school_id ).on('value',function(snap){
          ctrl.school = snap.val()
         //Set up all of the dates with adjusted time zone using.. moment for cross browser ...safai does not parse using new Date()
        
          if(ctrl.school.public.start_date)
          ctrl.dates.start_date =  moment(ctrl.school.public.start_date)
          console.log(ctrl.dates.start_date)

          if(ctrl.school.public.end_date)
          ctrl.dates.end_date =  moment(ctrl.school.public.end_date)


          if(ctrl.school.public.outreach_start_date)
          ctrl.dates.outreach_start_date =  moment(ctrl.school.public.outreach_start_date)

          if(ctrl.school.public.outreach_end_date)
          ctrl.dates.outreach_end_date =  moment(ctrl.school.public.outreach_end_date)

          if(ctrl.school.public.mini_outreach_start_date)
          ctrl.dates.mini_outreach_start_date =  moment(ctrl.school.public.mini_outreach_start_date)
          
          if(ctrl.school.public.mini_outreach_end_date)
          ctrl.dates.mini_outreach_end_date =  moment(ctrl.school.public.mini_outreach_end_date)
  

      })
         
       function changeDate(ref){
  
            $scope.public[ref] =  moment(ctrl.dates[ref]).format("YYYY-MM-DD");
          
        }  

      var questionsRef = firebase.database().ref('/questions_for_applications/' )
        ctrl.questions = $firebaseObject(questionsRef)  

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
      var storageRef = firebase.storage().ref('/schools_public/'+ctrl.school_id);
      var banner_ref =   firebase.database().ref('/schools/' +ctrl.school_id ).child('public/banner_1080');

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
           ctrl.myImage= null
       
              banner_ref.set(downloadURL);
    

        });
        }//end savePhoto function


function createDateAsUTC(date) {
    date = new Date(date )
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0,0));
}

  }
}

export default SchoolSettingsController;
