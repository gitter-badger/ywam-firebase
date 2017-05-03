class DonationCodePageController {
   /* @ngInject */
  constructor($stateParams) {
    var ctrl = this;
        
        ctrl.donationCode = $stateParams.donationCode;
        ctrl.reocuring='M'//default value set as Montly

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.donationCodePage = snap.val()
        // })
  }
}

export default DonationCodePageController;
