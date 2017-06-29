class BasePartnersController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'basePartners';

        var Ref = firebase.database().ref('/donors')
        Ref.on('value',function(snap){
          ctrl.donors = snap.val()
        })
  }
}

export default BasePartnersController;
