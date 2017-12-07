class DonorPageController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        Site.hideHeaderLinks=true;
       
        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.donorPage = snap.val()
        // })
  }
}

export default DonorPageController;
