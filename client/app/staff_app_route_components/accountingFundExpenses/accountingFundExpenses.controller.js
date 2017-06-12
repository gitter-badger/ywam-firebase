class AccountingFundExpensesController {
   /* @ngInject */
  constructor($firebaseObject,moment, Site, $timeout) {
    var ctrl = this;
        ctrl.this_month =  moment().format("YYYY-MM");
        ctrl.day_of_month = moment().format("D");
    
        ctrl.addbtn = addbtn
        ctrl.editDialog = editDialog
        ctrl.fulfillCommitment = fulfillCommitment
        
        

         var Ref = firebase.database().ref('/funds').on('value',function(snap){
            ctrl.total_high=0
            ctrl.total_low=0  
            ctrl.funds = snap.val()
            
            snap.forEach(function(item){
              var stats=item.val().stats
             if(stats){
              ctrl.total_high += +stats[ctrl.this_month].amount_topay_high
              ctrl.total_low += +stats[ctrl.this_month].amount_topay_low
             }
            })
            $timeout()

         })
        



         firebase.database().ref('/location_public/meta/currencySym').once('value',function(snap){
             ctrl.currencySym = snap.val()
         })


         function addbtn($event, fund_id){
          var template =`<fund-commitment-edit fund-id="${fund_id}"></fund-commitment-edit>`;
          Site.showDialog($event, template )

        }
        function editDialog($event, fund_id, commitment_id){
          var template =`<fund-commitment-edit fund-id="${fund_id}" commitment-id="${commitment_id}"></fund-commitment-edit>`;
          Site.showDialog($event, template )

        }
        
        function fulfillCommitment(fund_id, commitment_id){


          //maybe show dialog to ask for amount

          console.log(fund_id, commitment_id) 
          // if(!item.fixed_amount){
          //   console.log('we should ask for amount since this was not a fixed amount commitment')
          // }
              var data ={compleated:true,
                         compleated_by:Site.user.id }

            var Ref = firebase.database().ref('/funds/'+fund_id+'/commitments/'+commitment_id)
                Ref.child('fulfillments/'+ctrl.this_month).update(data)

        }

       
  }
}

export default AccountingFundExpensesController;
