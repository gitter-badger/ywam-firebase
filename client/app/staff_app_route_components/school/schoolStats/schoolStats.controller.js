class SchoolStatsController {
   /* @ngInject */
  constructor($stateParams, moment) {
    var ctrl = this;
        
       var school_id = $stateParams.school_id;

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.schoolStats = snap.val()
        // })



         ctrl.data = []

        ctrl.labels =[]
           var week_before = 40
            var start =[]
            var submit =[]
            var accepted=[]

          var Ref =  firebase.database().ref('schools').child(school_id)



          Ref.once('value',snap=>{
            var school = snap.val()
       
        if(school.public && school.public.start_date){
        
        console.log(school.stats)
        
        for (var i = 1; i < 40; i++) { 

            var week = moment(school.public.start_date).subtract(i, 'week').format("YYYY-WW");
           
            var count = 0
            if(school.stats.start[week])
               count =  school.stats.start[week]
            start.push(count)

            var count = 0
            if(school.stats.submit[week])
               count =  school.stats.submit[week]
            submit.push(count)
           
            var count = 0
            if(school.stats.accepted[week])
               count =  school.stats.accepted[week]
            accepted.push(count)
        
          
                  ctrl.labels.push( ' '+week_before +' wk.  ')
                  week_before--
            

        }
         
            ctrl.data.push(start)
            ctrl.data.push(submit)
            ctrl.data.push(accepted)
    
  
}
           
          
           

           

          })
         
  ctrl.series = ['Started Apps','Submited apps','Accepted Apps'];
  ctrl.options = {
        
        elements : { 
         line : { 
                    // tension : .8,
                    // fill:false 
                  },
         point:{
           radius: 0
         }           
       
         },
        scales: {
            yAxes: [{
                // display: false,
                 
               
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
