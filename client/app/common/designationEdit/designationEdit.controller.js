class DesignationEditController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.save = save

         if(ctrl.code == undefined)
            ctrl.code = null

        console.log(ctrl.code)
      

        var Ref = firebase.database().ref('/funds')

        if(ctrl.code){
          Ref.child(ctrl.code).on('value', function(snap){
            ctrl.form = snap.val()
          })

        }
        // Ref.on('value',function(snap){
        //   ctrl.designationEdit = snap.val()
        // })

       function save(){

         //add
         if(!ctrl.code){
           
           Ref.child(ctrl.form.code).set(ctrl.form)

         } 


         Site.hideDialog()
       }

  }
}

export default DesignationEditController;
