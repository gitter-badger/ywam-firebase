class AppStatusesSelectorController {
   /* @ngInject */
  constructor($timeout) {
    var ctrl = this;
        ctrl.$onInit = onInit
        
      
    function onInit(){

     ctrl.statuses = {1 : {text: 'Started'}, 
                      8 : {text: 'Cancelled'},
                      9 : {text: 'Withdrawn'},
                      10: {text:'Submitted'},
                      11: {text:'In review'},
                      12: {text:'Denied'},
                      13: {text:'Accepted'},
                      30: {text:'Arrived'},
                      70: {text:'Alumni'}
                    };
     ctrl.statuses[10].active = true;
     ctrl.statuses[11].active = true;
     ctrl.statuses[13].active = true;
     ctrl.statuses[30].active = false;
     ctrl.statuses[70].active = false;
    //  console.log( ctrl.statuses)


    var ref = firebase.database().ref('schools/'+ctrl.schoolId+'/count').on('value',function(snap){

     var count = snap.val()
     if(count){
     ctrl.statuses[1].count = count.started;
     ctrl.statuses[8].count = count.cancelled;
     ctrl.statuses[9].count = count.withdrawn;
     ctrl.statuses[10].count = count.submited;
     ctrl.statuses[11].count = count.process;
     ctrl.statuses[12].count = count.denied;
     ctrl.statuses[13].count = count.accepted;
     ctrl.statuses[30].count = count.arrived;
     ctrl.statuses[70].count = count.alumni;
     $timeout()
     }
    })  
   
     }

  }
}

export default AppStatusesSelectorController;
