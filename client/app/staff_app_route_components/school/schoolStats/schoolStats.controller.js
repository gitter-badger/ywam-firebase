class SchoolStatsController {
   /* @ngInject */
  constructor($stateParams) {
    var ctrl = this;
        
       var school_id = $stateParams.school_id;

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.schoolStats = snap.val()
        // })



         ctrl.data = []
          ctrl.labels =[]


          firebase.database().ref('schools').child(school_id).child('stats/lead_up')
          .once('value',snap=>{
            var week_before = 20
            var stats = snap.val()
            var start =[]
            var submit =[]

      
             angular.forEach(stats.start , weekSnap=>{

               start.push(weekSnap)
               ctrl.labels.push( ' '+week_before +' wk.  ')
               week_before--
             })

             angular.forEach( stats.submit ,weekSnap=>{
               submit.push(weekSnap)
             })

           //  ctrl.data.push(start)
             ctrl.data.push(submit)
             console.log(ctrl.data)

          })
         
  ctrl.series = ['submited apps'];
  ctrl.options = {
        
        elements : { 
         line : { 
                    // tension : .8,
                    fill:false },
         point:{
           radius: 0
         }           
       
         },
        scales: {
            yAxes: [{
                display: false,
                 
               
            }],
             xAxes: [{
          
                display: true,
               
            }],
        }
      }

  ctrl.override ={
    label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
  }    
  }
}

export default SchoolStatsController;
