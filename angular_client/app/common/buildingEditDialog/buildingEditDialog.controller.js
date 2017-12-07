class BuildingEditDialogController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.save = save;
        ctrl.$onInit = onInit

        var Ref = firebase.database().ref('/location/buildings')
      
        function onInit(){
        if(ctrl.buildingId)
        Ref.child(ctrl.buildingId).on('value',function(snap){
          ctrl.building = snap.val()
        })

        } 


      function save(){
        if(ctrl.buildingId){
          Ref.child(ctrl.buildingId).update(ctrl.building)
      }
      if(!ctrl.buildingId){
        Ref.push(ctrl.building)
      }
        
        Site.hideDialog()
      }


     

  }
}

export default BuildingEditDialogController;
