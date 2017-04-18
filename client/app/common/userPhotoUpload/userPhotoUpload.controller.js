class UserPhotoUploadController {
    /* @ngInject */
  constructor($scope,Auth,$firebaseObject, $timeout) {
    var ctrl = this;
    ctrl.user_id = Auth.$getAuth().uid
    ctrl.avatar = null;
    ctrl.myImage= null;//$firebaseObject(contactRef)
    ctrl.myCroppedImage='';
    ctrl.savePhoto = savePhoto;
    ctrl.$onInit = onInit

function onInit(){
  
    
    var contactRef =   firebase.database().ref('/profiles/' +ctrl.user_id ).child('contact');
        contactRef.child('avatar_200').on('value',function(snap){
          ctrl.processing = false
          ctrl.avatar =snap.val();
       })


    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    
  //  var fileInput =  document.getElementById('fileInput')
  //      fileInput.addEventListener('change', function(e){
  //       var file =   e.target.files[0];
  //        ctrl.myImage = file
  //        ctrl.file_selected = true
  //        console.log('changed file!!')
  //        $timeout(()=>{})

  //      })  
  // }
    
     function handleFileSelect(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
               ctrl.file_selected = true
              ctrl.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
         
      };
  };


    function savePhoto(){
        var storageRef = firebase.storage().ref('/profiles/'+ctrl.user_id+'/avatars');
        ctrl.upload_progress = 1

        var file =  ctrl.myCroppedImage
        var uploadTask = storageRef.child('avatar.jpg' ).put(file);

            // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    $timeout(function(){
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
          
          ctrl.processing = true;


        });




    }
    
   





   
  }
}

export default UserPhotoUploadController;
