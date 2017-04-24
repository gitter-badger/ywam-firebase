class ReferenceDisplayController {
  /* @ngInject */
  constructor() {
   var ctrl = this;
      
     
      ctrl.$onInit = ()=>{
           console.log(ctrl.key);
      var refRef = firebase.database().ref('applications/'+ctrl.key)
      refRef.on('value',function(snap){
                 ctrl.id = snap.key.replace(/\D/g,'')
                 if(snap.val())
                 {
                    ctrl.reference = snap.val()
                    ctrl.form =  ctrl.reference.form
                }
                })
      
      }
      
     
      
  }
}

export default ReferenceDisplayController;
