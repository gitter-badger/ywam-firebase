class AppAdminNotesController {
     /* @ngInject */
  constructor(Auth, $firebaseObject) {
   var ctrl = this
       ctrl.addAdminNote = addAdminNote
       ctrl.deleteAdminNote = deleteAdminNote
       ctrl.notes = []
      

    var appNotesRef = firebase.database().ref('applications').child(ctrl.appId).child('admin_notes')
        appNotesRef.on('child_added',function(snap){
          var note = snap.val()
  
            firebase.database().ref('profiles').child(note.user_id).child('com').on('value',
            function(snap){
               note.user = snap.val()
               ctrl.notes.push(note)
            })


        })
     

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
