class BaseHousingController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'baseHousing';

        var Ref = firebase.database().ref('/location/buildings').orderByChild('rooms')
        Ref.on('value',function(snap){
          ctrl.rooms = snap.val()
        })
  }
}

export default BaseHousingController;
