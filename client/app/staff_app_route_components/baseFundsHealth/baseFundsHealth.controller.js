class BaseFundsHealthController {
   /* @ngInject */
  constructor(moment, $timeout) {
    var ctrl = this;
    ctrl.totalNegitiveFunds = 0
    ctrl.series = [];
    ctrl.data =[]
    ctrl.labels = []
    ctrl.lastDays =400
    ctrl.totalNegitiveFundsPerDay={}
    ctrl.health =[]
    


    for (var i = 0; i <= ctrl.lastDays ; i++) { 
      
       var date=   moment().subtract(ctrl.lastDays-i, 'day').format("MMM DD")
       // ctrl.labels.push( ctrl.lastDays - i)
       ctrl.labels.push(date)
       
       date =  moment().subtract(ctrl.lastDays-i, 'day').format("YYYY-MM-DD");
       ctrl.totalNegitiveFundsPerDay[date] = 0

   }

    var Ref = firebase.database().ref('/funds')

    Ref.on('value',function(snap){
      snap.forEach(function(snap){
        var fund =snap.val()
        if(fund.balance){
        // console.log(fund.balance.current)
        if(fund.balance.current<0){

        ctrl.series.push(fund.meta.name);
          var history = []
        for (var i = 0; i <= ctrl.lastDays ; i++) { 
         
        var date =  moment().subtract(ctrl.lastDays-i, 'day').format("YYYY-MM-DD");
        var balance = 0

        if(fund.balance.history && fund.balance.history[date]){
          
          balance = +fund.balance.history[date]
         
        }
        // console.log(balance)
          history.push(balance)
          ctrl.totalNegitiveFundsPerDay[date] = ctrl.totalNegitiveFundsPerDay[date] + +balance

        }//for each day
        ctrl.data.push(history)

        }
        }
      })//end for each fund

      var funds = snap.val()
      var general = funds['general']

      ctrl.series.push(general.meta.name);
      var history = []
        for (var i = 0; i <= ctrl.lastDays ; i++) { 

        var date =  moment().subtract(ctrl.lastDays-i, 'day').format("YYYY-MM-DD");
        var balance = 0

        if(general.balance.history && general.balance.history[date]){
          balance = general.balance.history[date]
          // console.log(balance)
        }

          // var dayNegAbs = Math.abs(ctrl.totalNegitiveFundsPerDay[date])
          var healthPercentage = +((+balance + +ctrl.totalNegitiveFundsPerDay[date]) * 100 / Math.abs(balance)); 
         
          if(healthPercentage <= -100)//cap at negitve 100%
             healthPercentage = -100

          ctrl.health.push(healthPercentage)
          history.push(balance)

        }
        ctrl.data.push(history)


     //  console.log((+funds['general'].balance.current + +ctrl.totalNegitiveFunds))
      // console.log(ctrl.generalFundHealth)
      $timeout()
    })//end on value


    ctrl.options2={ title: {
      display: true,
      text: 'Health'
    },
elements:{
line:{

      // borderWidth:10,
      backgroundColor:"rgba(75, 192, 192,0.5)",
      // fill:false
    }  
},
// responsive: true,
maintainAspectRatio: false     
 
};
ctrl.options={ 
          // responsive: true,
          maintainAspectRatio: false ,    
          legend:{
            display:true,
            position:'top'
          },
          };


  }
}

export default BaseFundsHealthController;
