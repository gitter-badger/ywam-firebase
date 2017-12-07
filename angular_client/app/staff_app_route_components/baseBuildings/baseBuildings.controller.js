class BaseBuildingsController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.editBuilding = editBuilding
        

        var Ref = firebase.database().ref('/location/buildings')
        Ref.on('value',function(snap){
          ctrl.buildings = snap.val()
        })

        function editBuilding($event , building_id = null){
          var template =`<building-edit-dialog building-id="${building_id}"></building-edit-dialog>`;
          Site.showDialog($event, template )
        }

  }
}

export default BaseBuildingsController;
