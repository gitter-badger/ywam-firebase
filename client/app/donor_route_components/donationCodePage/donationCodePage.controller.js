class DonationCodePageController {
   /* @ngInject */
  constructor($stateParams,$firebaseObject) {
    var ctrl = this;
        
       ctrl.avatar = 'img/default_avatar.png'; //updated later if avatar exists

        ctrl.donationCode = $stateParams.donationCode;
        ctrl.reocuring='M'//default value set as Montly

        var Ref = firebase.database().ref('/funds/'+ ctrl.donationCode+'/meta')
        
        ctrl.donation = $firebaseObject(Ref);
      
       var locationRef = firebase.database().ref('/location_public/meta/')
        
        ctrl.locationPublic = $firebaseObject(locationRef);
        // Ref.on('value',function(snap){
        //   ctrl.donation = snap.val()
        // })
  }
}

export default DonationCodePageController;
