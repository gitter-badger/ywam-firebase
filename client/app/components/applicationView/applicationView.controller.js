class ApplicationViewController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject,$timeout, $document,Auth) {
   var ctrl = this;
       ctrl.calculateAge = calculateAge
       ctrl.addAdminNote = addAdminNote
       ctrl.deleteAdminNote = deleteAdminNote
       ctrl.languages = {}
      

    var app_id = $stateParams.app_id;
    var appRef = firebase.database().ref('applications').child(app_id)
    ctrl.app = $firebaseObject(appRef);

    appRef.on('value',function(snap){
        var user_id = snap.val().for.user_id;
        var userRef = firebase.database().ref('profiles').child(user_id)
        ctrl.user = $firebaseObject(userRef)
       
        userRef.child('com/languages').on('child_added',function(snap){
         console.log(snap.key)
          //look up languages
          var lang = snap.key;
            var langRef = firebase.database().ref('languages').child(lang)
                langRef.on('value',function(snap){
                  console.log(snap.val())
                  ctrl.languages[snap.key] = snap.val();
                  ctrl.languages[snap.key].prof = ctrl.user.com.languages[snap.key]
                  $timeout(function(){});  
              })})//end on ref languages

         userRef.child('passport/nation_id').on('value',(snap)=>{
            //  console.log(snap.val())
             var natRef = firebase.database().ref('/phrases/nations/en/').child(snap.val())
                 natRef.on('value',(snap)=>{ctrl.user.com.nationality=snap.val()
                     console.log(snap.val())})
         })     

    })

 function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() -  new Date(birthday).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
   
function addAdminNote(){
    var user_id = Auth.$getAuth().uid;
    var adminNote ={ text: ctrl.new_admin_note,
                     time: firebase.database.ServerValue.TIMESTAMP,
                     user_id: user_id,
                    }
    var newKey=  appRef.child('admin_notes').push(adminNote)//push(adminNote);
        ctrl.new_admin_note = '';
}

function deleteAdminNote(id){
  console.log(id)
   appRef.child('admin_notes').child(id).remove();
}


  }
}

export default ApplicationViewController;
