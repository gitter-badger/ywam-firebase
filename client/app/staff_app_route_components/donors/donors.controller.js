class DonorsController {
   /* @ngInject */
  constructor($timeout) {
    var ctrl = this;
        
        ctrl.donors = []

        var Ref = firebase.database().ref('/donors')
        Ref.on('child_added',function(snap){
          var donor = snap.val()
          var index = ctrl.donors.push(donor)
              index--

          //get name
          firebase.database().ref('/profiles/'+snap.key+'/contact').once('value',function(contact){
            ctrl.donors[index].first_name = contact.val().first_name
            ctrl.donors[index].last_name = contact.val().last_name
            ctrl.donors[index].user_id = snap.key
             $timeout()
          })

         
        })
  }
}

export default DonorsController;
