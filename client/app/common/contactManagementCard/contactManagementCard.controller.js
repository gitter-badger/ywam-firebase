class ContactManagementCardController {
   /* @ngInject */
  constructor(Site, $timeout) {
    var ctrl = this;
        ctrl.addNote = addNote
        ctrl.deleteNote = deleteNote
        
        ctrl.$onInit = function(){
        var Ref = firebase.database().ref('crm/'+ctrl.userId)
        Ref.on('value',function(snap){
          ctrl.contact = snap.val()
            $timeout()
        })

           var DonorRef = firebase.database().ref('donors/'+ctrl.userId)
        DonorRef.on('value',function(snap){
          ctrl.donor = snap.val()
          $timeout()
        })

        }
  
        function addNote(){

            var note ={ text: ctrl.new_note,
                            time: firebase.database.ServerValue.TIMESTAMP,
                            user_id: Site.user.id,
                            first_name: Site.user.contact.first_name,
                            last_name: Site.user.contact.last_name
                            }
            var newKey=  firebase.database().ref('crm/'+ctrl.userId).child('notes').push(note)//push(note);
                ctrl.new_note = '';
        }

      function deleteNote(id){
        console.log(id)
        firebase.database().ref('crm/'+ctrl.userId).child('notes').child(id).remove();
      }


  }
}

export default ContactManagementCardController;
