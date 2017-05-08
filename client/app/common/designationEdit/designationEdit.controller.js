class DesignationEditController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.save = save

         if(ctrl.code == undefined)
            ctrl.code = null

        console.log(ctrl.code)
      

        var Ref = firebase.database().ref('/designation_codes')

        if(ctrl.code){
          Ref.child(ctrl.code).on('value')

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
