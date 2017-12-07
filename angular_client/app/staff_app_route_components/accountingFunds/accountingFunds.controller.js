class AccountingFundsController {
   /* @ngInject */
 constructor($firebaseObject, Site, $timeout , moment) {
    var ctrl = this;
        ctrl.addbtn = addbtn  
        ctrl.totalNegitiveFunds = 0
        ctrl.series = [];
        ctrl.data =[]
        ctrl.labels = []
        ctrl.lastDays = 30
        ctrl.editFundBalanceDialog = editFundBalanceDialog
        
        

      

        var Ref = firebase.database().ref('/funds')
         ctrl.funds = $firebaseObject(Ref)
        Ref.on('value',function(snap){
          snap.forEach(function(snap){
            var fund =snap.val()
            if(fund.balance){
            // console.log(fund.balance.current)
            if(fund.balance.current<0){
            ctrl.totalNegitiveFunds += +fund.balance.current

            ctrl.series.push(fund.meta.name);
              var history = []
            for (var i = 0; i <= ctrl.lastDays ; i++) { 
             
            var date =  moment().subtract(ctrl.lastDays-i, 'day').format("YYYY-MM-DD");
            
            var balance = 0

            if(fund.balance.history && fund.balance.history[date]){
              
              balance = fund.balance.history[date]
             
            }
              history.push(balance)

            }
            ctrl.data.push(history)

            }
            }
          })





          var funds = snap.val()

          var general = funds['general']

          ctrl.series.push(general.meta.name);
          var history = []
        for (var i = 0; i <= ctrl.lastDays ; i++) { 

        var date =  moment().subtract(ctrl.lastDays-i, 'day').format("YYYY-MM-DD");
        
        var balance = 0

        if(general.balance.history && general.balance.history[date]){
          balance = general.balance.history[date]
          console.log(balance)
        }
          history.push(balance)

        }
        ctrl.data.push(history)


          ctrl.totalNegitiveFundsAbs = Math.abs(ctrl.totalNegitiveFunds)
          ctrl.generalFundHealth = +((+funds['general'].balance.current + +ctrl.totalNegitiveFunds) * 100 / + Math.abs(funds['general'].balance.current)); 
        //  console.log((+funds['general'].balance.current + +ctrl.totalNegitiveFunds))
          // console.log(ctrl.generalFundHealth)
          $timeout()
        })



         firebase.database().ref('/location_public/meta/staff_url')
           .on('value',function(snap){
           ctrl.base_url = snap.val()
        })

        function addbtn($event){
          var template =`<fund-edit></fund-edit>`;

          Site.showDialog($event, template )

        }

        for (var i = 0; i <= ctrl.lastDays ; i++) { 
         
          var date=   moment().subtract(ctrl.lastDays-i, 'day').format("MMM DD")
          // ctrl.labels.push( ctrl.lastDays - i)
          ctrl.labels.push(date)

      }
     

        // ctrl.data = [
        //   [65, 59, 80, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 86, 27, 90]
        // ];
        ctrl.onClick = function (points, evt) {
          console.log(points, evt);
        };
        ctrl.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        ctrl.options =   {
          responsive: true,
          maintainAspectRatio: false ,
          legend:{
            display:true,
            position:'bottom'
          },
          scales: {
            yAxes: [
              // {
              //   id: 'y-axis-1',
              //   type: 'linear',
              //   display: false,
              //   position: 'left'
              // },
              {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
              }
            ]
          }
        };

        function editFundBalanceDialog($event, fund_id){
          var template =`<fund-edit-balance-dialog fund-id="${fund_id}"></fund-edit-balance-dialog>`;
          Site.showDialog($event, template )

        }


  }
}

export default AccountingFundsController;
