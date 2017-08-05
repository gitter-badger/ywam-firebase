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

             ctrl.new_note.time=  firebase.database.ServerValue.TIMESTAMP
             ctrl.new_note.user_id = Site.user.id
             ctrl.new_note.first_name= Site.user.contact.first_name
             ctrl.new_note.last_name= Site.user.contact.last_name
                            
            var newKey=  firebase.database().ref('crm/'+ctrl.userId).child('notes').push(ctrl.new_note)
                ctrl.new_note = {};
        }

      function deleteNote(id){
        console.log(id)
        firebase.database().ref('crm/'+ctrl.userId).child('notes').child(id).remove();
      }


  }
}

export default ContactManagementCardController;
