class ReferenceDisplayController {
  constructor() {
   var ctrl = this;
      
     
      ctrl.$onInit = ()=>{
           console.log(ctrl.key);
      var refRef = firebase.database().ref('applications/'+ctrl.key)
      refRef.on('value',function(snap){
                ctrl.reference=snap.val()
                ctrl.id = snap.key.replace(/\D/g,'')
               
                })
      
      }
      
     
      
  }
}

export default ReferenceDisplayController;
