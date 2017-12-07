class AccountingFundExpensesController {
   /* @ngInject */
  constructor($firebaseObject,moment, Site, $timeout) {
    var ctrl = this;
        ctrl.site = Site
        ctrl.this_month =  moment().format("YYYY-MM");
        ctrl.today = moment().format("YYYY-MM-DD")
        ctrl.start_of_month = moment().format("YYYY-MM-01")
        ctrl.total_high=0
        ctrl.total_low=0  

       
        ctrl.addbtn = addbtn
        ctrl.editDialog = editDialog
        ctrl.fulfillCommitment = fulfillCommitment
        ctrl.editFundBalanceDialog = editFundBalanceDialog
        

        ctrl.start_date = moment().subtract(45,'days').format("YYYY-MM-DD")
        ctrl.end_date = moment().add(30,'days').format("YYYY-MM-DD")

        firebase.database().ref('/fund_scheduled_bills').orderByKey().startAt(ctrl.start_date).endAt(ctrl.end_date).on('value',function(snap){
           ctrl.total_high=0
          ctrl.total_low=0 
          ctrl.scheduled_bills = snap.val()

          snap.forEach(function(day){

              day.forEach(function(bill){
              var item = bill.val()
              
               if(!item.compleated){
                 if(!ctrl.first_unpaid_bill_date)
                 ctrl.first_unpaid_bill_date = day.key
              if(item.fixed_amount){
                          ctrl.total_low += +item.fixed_amount
                          ctrl.total_high += +item.fixed_amount
                    }else{
                          ctrl.total_low += +item.low_amount
                          ctrl.total_high += +item.high_amount
                    }
                    // console.log(ctrl.total_high)
              }       
          })
           })
            $timeout()
        })

         var Ref = firebase.database().ref('/funds').on('value',function(snap){
           
            ctrl.total_balances = 0;
            ctrl.funds = snap.val()
            
            snap.forEach(function(fund){
              

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
         function editFundBalanceDialog($event, fund_id){
          var template =`<fund-edit-balance-dialog fund-id="${fund_id}"></fund-edit-balance-dialog>`;
          Site.showDialog($event, template )

        }
        
        function fulfillCommitment(date, commitment_id){


          //maybe show dialog to ask for amount

       
          // if(!item.fixed_amount){
          //   console.log('we should ask for amount since this was not a fixed amount commitment')
          // }
            
              var data ={compleated: !ctrl.scheduled_bills[date][commitment_id].compleated,
                         compleated_by:Site.user.id }

        
            firebase.database().ref('/fund_scheduled_bills/'+date+'/'+commitment_id).update(data)

        }

       
  }
}

export default AccountingFundExpensesController;
