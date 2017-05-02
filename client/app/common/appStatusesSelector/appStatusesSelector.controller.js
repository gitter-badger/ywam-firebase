class AppStatusesSelectorController {
   /* @ngInject */
  constructor() {
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
     }

  }
}

export default AppStatusesSelectorController;
