class FundCommitmentEditController {
   /* @ngInject */
  constructor(Site,$firebaseObject) {
    var ctrl = this;
        ctrl.save = save
        ctrl.$onInit = onInit
        ctrl.daysOfMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]


        function onInit(){
        //  if(ctrl.code == undefined)
        //     ctrl.code = null
        var Ref = firebase.database().ref('/funds/'+ctrl.fundId+'/commitments')

        console.log(ctrl.fundId)
      


        if(ctrl.commitmentId){
         var  commitRef = Ref.child(ctrl.commitmentId)
              ctrl.form = $firebaseObject(commitRef)
              

        }
      
         }// end oninit

       function save(){
         if(ctrl.commitmentId)
          ctrl.form.$save()

          if(!ctrl.commitmentId)
          firebase.database().ref('/funds/'+ctrl.fundId+'/commitments').push(ctrl.form)
   
         Site.hideDialog()
       }

  }
}

export default FundCommitmentEditController;
