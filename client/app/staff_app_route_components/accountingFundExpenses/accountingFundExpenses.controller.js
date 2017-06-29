class AccountingFundExpensesController {
   /* @ngInject */
  constructor($firebaseObject,moment, Site, $timeout) {
    var ctrl = this;
        ctrl.this_month =  moment().format("YYYY-MM");
        ctrl.this_month_text = moment().format('MMMM')
        ctrl.day_of_month = moment().format("D");
        ctrl.next_month =  moment().add(1,'months').format("YYYY-MM");
        ctrl.next_month_text =  moment().add(1,'months').format('MMMM');
        ctrl.look_out_days = moment().add(15,'days').format("D");

       
        ctrl.addbtn = addbtn
        ctrl.editDialog = editDialog
        ctrl.fulfillCommitment = fulfillCommitment
        
        

         var Ref = firebase.database().ref('/funds').on('value',function(snap){
            ctrl.total_high=0
            ctrl.total_low=0  
            ctrl.total_balances = 0;
            ctrl.funds = snap.val()
            
            snap.forEach(function(fund){
              
              var stats=fund.val().stats
              ctrl.funds[fund.key].upcoming_bills_high = 0
              ctrl.funds[fund.key].upcoming_bills_low = 0
            

           //get next months amount to pay
            angular.forEach(fund.val().commitments, function(item,key){
          if(  ( !item.fulfillments[ctrl.next_month] || item.fulfillments[ctrl.next_month] && !item.fulfillments[ctrl.next_month].compleated)  && item.due_by < ctrl.look_out_days){
              
                  if(item.fixed_amount){
                          ctrl.funds[fund.key].upcoming_bills_low += +item.fixed_amount
                          ctrl.funds[fund.key].upcoming_bills_high += +item.fixed_amount
                    }else{
                          ctrl.funds[fund.key].upcoming_bills_low += +item.low_amount
                          ctrl.funds[fund.key].upcoming_bills_high += +item.high_amount
                    }
             
              
               $timeout()
            }


           })


             if(stats){
             
              ctrl.funds[fund.key].upcoming_bills_low += +stats[ctrl.this_month].amount_topay_low
              ctrl.funds[fund.key].upcoming_bills_high += +stats[ctrl.this_month].amount_topay_high
           }

           //and add this to the total of all funds
            ctrl.total_high += +ctrl.funds[fund.key].upcoming_bills_high
            ctrl.total_low += +ctrl.funds[fund.key].upcoming_bills_low

             
             var balance=fund.val().balance
             if(balance && balance.current){
               ctrl.total_balances += +balance.current
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
