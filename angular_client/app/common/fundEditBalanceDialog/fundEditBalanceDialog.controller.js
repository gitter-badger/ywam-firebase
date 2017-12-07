class FundEditBalanceDialogController {
   /* @ngInject */
  constructor($firebaseObject,Site) {
    var ctrl = this;
        
         ctrl.updateBalance = updateBalance
        ctrl.$onInit = onInit
        ctrl.close =  ()=> Site.hideDialog()

     var Ref = firebase.database().ref('/funds')


        function onInit(){
        //  if(ctrl.fundId == undefined)
        //     ctrl.code = null

        console.log(ctrl.fundId)
      


        if(ctrl.fundId){

         var  fundBalRef = Ref.child(ctrl.fundId+'/balance')
              ctrl.balance = $firebaseObject(fundBalRef)
              
              // fundBalRef.on('value', function(snap){
              //   var user_id = snap.val().update_by
              //   firebase.database().ref('crm/'+user_id+'/name').once('value',function(snap){
                
              //   })
              // })
        }
      
         }// end oninit




 function updateBalance(){
           ctrl.balance.last_update = new Date().getTime()
           ctrl.balance.update_by = Site.user.id
           ctrl.balance.update_by_first_name = Site.user.contact.first_name
           ctrl.balance.update_by_last_name = Site.user.contact.last_name
           ctrl.balance.$save()
           

        }



  }
}

export default FundEditBalanceDialogController;
