class DonationCodePageController {
   /* @ngInject */
  constructor($stateParams,$firebaseObject) {
    var ctrl = this;
        
        ctrl.donationCode = $stateParams.donationCode;
        ctrl.reocuring='M'//default value set as Montly

        var Ref = firebase.database().ref('/designation_codes/'+ ctrl.donationCode)
        
        ctrl.donation = $firebaseObject(Ref);
        // Ref.on('value',function(snap){
        //   ctrl.donation = snap.val()
        // })
  }
}

export default DonationCodePageController;
