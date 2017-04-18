class AppAdminNotesController {
     /* @ngInject */
  constructor(Auth, $firebaseObject) {
   var ctrl = this
       ctrl.addAdminNote = addAdminNote
       ctrl.deleteAdminNote = deleteAdminNote
  
       ctrl.$onInit = function(){
    var appNotesRef = firebase.database().ref('applications').child(ctrl.appId).child('admin_notes')
        appNotesRef.on('value',function(snap){
          ctrl.notes = []
          
          snap.forEach(function(snap){
              var note = snap.val()
                  note.$id = snap.key
           
            if(note.user_id){      
            firebase.database().ref('profiles').child(note.user_id).child('contact').on('value',
            function(snap){
               note.user = snap.val()
               ctrl.notes.push(note)
            })
            }else{
               ctrl.notes.push(note)//push it in with out the user (some really old notes won't have user id)
            }
        })
      })
}    
    

    function addAdminNote(){
    var user_id = Auth.$getAuth().uid;
    var adminNote ={ text: ctrl.new_admin_note,
                     time: firebase.database.ServerValue.TIMESTAMP,
                     user_id: user_id,
                    }
    var newKey=  appNotesRef.push(adminNote)//push(adminNote);
        ctrl.new_admin_note = '';
}

function deleteAdminNote(id){
  console.log(id)
   appNotesRef.child(id).remove();
}




  }
}

export default AppAdminNotesController;
