class FundEditController {
   /* @ngInject */
  constructor(Site, $firebaseObject) {
    var ctrl = this;
        ctrl.save = save
       
        ctrl.$onInit = onInit

     var Ref = firebase.database().ref('/funds')


        function onInit(){
        //  if(ctrl.code == undefined)
        //     ctrl.code = null

        console.log(ctrl.code)
      


        if(ctrl.code){
         var  fundRef = Ref.child(ctrl.code+'/meta')
              ctrl.form = $firebaseObject(fundRef)

         var  fundBalRef = Ref.child(ctrl.code+'/balance')
              ctrl.balance = $firebaseObject(fundBalRef)
              

        }
      
         }// end oninit

       function save(){
         if(ctrl.code){
          ctrl.form.$save()
        }

          if(!ctrl.code)
          Ref.child(ctrl.form.code+'/meta').set(ctrl.form)
          Site.hideDialog()
       }

     
  }
}

export default FundEditController;
