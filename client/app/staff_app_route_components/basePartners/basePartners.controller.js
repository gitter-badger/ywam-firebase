class BasePartnersController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'basePartners';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.basePartners = snap.val()
        // })
  }
}

export default BasePartnersController;
