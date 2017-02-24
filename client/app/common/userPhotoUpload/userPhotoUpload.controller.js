class UserPhotoUploadController {
    /* @ngInject */
  constructor($scope,Auth,$firebaseObject, $stateParams,$state,$timeout,) {
    var ctrl = this;
    ctrl.user_id = $stateParams.user_id
    ctrl.avatar = null;

     var storageRef = firebase.storage().ref('/profiles/'+ctrl.user_id);
    
    var comRef =   firebase.database().ref('/profiles/' +ctrl.user_id ).child('com');
        comRef.on('value',function(snap)
        {
               

           ctrl.avatar = snap.val().avatar_1080

              console.log(snap.val().current_avatar_id)
              
           firebase.storage().refFromURL(snap.val().avatar_200).getDownloadURL().then(function(url){
                console.log('got download url '+ url)
                $timeout(function(){
                ctrl.avatar_200 =  url 

                })
              
           })
         
        })
       
   
    ctrl.myImage= null;//$firebaseObject(comRef)
    ctrl.myCroppedImage='';
    ctrl.savePhoto = savePhoto;


    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    
    function savePhoto(){
       
       ctrl.upload_progress = 1
      
      // Create a root reference

      var file =  ctrl.myCroppedImage
      // console.log(file)

     var uploadTask = storageRef.child('avatar_1080.jpg' ).put(file);

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
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          console.log('finished upload: ' +downloadURL)

          //Save the URL to users profile
       

          //push a new avatar_id into the avatars node
          var data=  {1080:false}
       firebase.database().ref('/profiles/' +ctrl.user_id ).child('avatars').push(data)
              .then(function(snap){
                console.log(snap.key)
                comRef.child('current_avatar_id').set(snap.key);

            //navigate to return state
            if($state.previous.name != 'userPhotoUpload'){
                console.log('going back somewhere')
               $state.go($state.previous.name, $state.previous.params)
            }else {
                console.log('going to profile' +$stateParams.user_id)
                $state.go('profile', {user_id:$stateParams.user_id}  );  
            }
         
              
            
            }) ;
            
              //
    

        });




    }
    
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






   
  }
}

export default UserPhotoUploadController;
