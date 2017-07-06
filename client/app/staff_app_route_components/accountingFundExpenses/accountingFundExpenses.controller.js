class AccountingFundExpensesController {
   /* @ngInject */
  constructor($firebaseObject,moment, Site, $timeout) {
    var ctrl = this;
        ctrl.this_month =  moment().format("YYYY-MM");
        ctrl.today = moment().format("YYYY-MM-DD")
        ctrl.start_of_month = moment().format("YYYY-MM-01")
        ctrl.total_high=0
        ctrl.total_low=0  

       
        ctrl.addbtn = addbtn
        ctrl.editDialog = editDialog
        ctrl.fulfillCommitment = fulfillCommitment
        

        ctrl.start_date = moment().subtract(45,'days').format("YYYY-MM-DD")
        ctrl.end_date = moment().add(30,'days').format("YYYY-MM-DD")

        firebase.database().ref('/fund_scheduled_bills').orderByKey().startAt(ctrl.start_date).endAt(ctrl.end_date).on('value',function(snap){

          ctrl.scheduled_bills = snap.val()

          snap.forEach(function(day){
              day.forEach(function(bill){
              var item = bill.val()
              if(!item.compleated){
              if(item.fixed_amount){
                          ctrl.total_low += +item.fixed_amount
                          ctrl.total_high += +item.fixed_amount
                    }else{
                          ctrl.total_low += +item.low_amount
                          ctrl.total_high += +item.high_amount
                    }

              }       
          })
           })

        })

         var Ref = firebase.database().ref('/funds').on('value',function(snap){
           
            ctrl.total_balances = 0;
            ctrl.funds = snap.val()
            
            snap.forEach(function(fund){
              
              // var stats=fund.val().stats
              // ctrl.funds[fund.key].upcoming_bills_high = 0
              // ctrl.funds[fund.key].upcoming_bills_low = 0
            

           //get next months amount to pay
          //   angular.forEach(fund.val().commitments, function(item,key){
          // if(  ( !item.fulfillments[ctrl.next_month] || item.fulfillments[ctrl.next_month] && !item.fulfillments[ctrl.next_month].compleated)  && item.due_by < ctrl.look_out_days){
              
          //         if(item.fixed_amount){
          //                 ctrl.funds[fund.key].upcoming_bills_low += +item.fixed_amount
          //                 ctrl.funds[fund.key].upcoming_bills_high += +item.fixed_amount
          //           }else{
          //                 ctrl.funds[fund.key].upcoming_bills_low += +item.low_amount
          //                 ctrl.funds[fund.key].upcoming_bills_high += +item.high_amount
          //           }
             
              
          //      $timeout()
          //   }


          //  })


          //    if(stats){
             
          //     ctrl.funds[fund.key].upcoming_bills_low += +stats[ctrl.this_month].amount_topay_low
          //     ctrl.funds[fund.key].upcoming_bills_high += +stats[ctrl.this_month].amount_topay_high
          //  }

           //and add this to the total of all funds
            // ctrl.total_high += +ctrl.funds[fund.key].upcoming_bills_high
            // ctrl.total_low += +ctrl.funds[fund.key].upcoming_bills_low

             
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
        
        function fulfillCommitment(date, commitment_id){


          //maybe show dialog to ask for amount

       
          // if(!item.fixed_amount){
          //   console.log('we should ask for amount since this was not a fixed amount commitment')
          // }
            
              var data ={compleated:true,
                         compleated_by:Site.user.id }

        
            firebase.database().ref('/fund_scheduled_bills/'+date+'/'+commitment_id).update(data)

        }

       
  }
}

export default AccountingFundExpensesController;
