class StudentPhotosController {
  /* @ngInject */
  constructor(School,$stateParams, $mdMedia, Site,$firebaseObject, $timeout ) {
      var ctrl = this;
      var school_id = $stateParams.school_id;
          ctrl.apps =  School.getApps(school_id, true)
          ctrl.avatars = Site.avatars
          ctrl.print = print

      var school_ref = firebase.database().ref('/schools/'+school_id + '/public')

          ctrl.school = $firebaseObject(school_ref);
        
          ctrl.photo_size = 150;
           if($mdMedia('xs'))
            ctrl.photo_size = 90;
         
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

function print(size){

  if(size =='letter'){
      ctrl.photo_size = 113;
      ctrl.photosPerPage = 24;
      $timeout(function(){  window.print();})
     
  }
if(size =='A4'){
      ctrl.photo_size = 130;
      ctrl.photosPerPage = 24;
      $timeout(function(){  window.print();})
     
  }


}



  }
}

export default StudentPhotosController;
