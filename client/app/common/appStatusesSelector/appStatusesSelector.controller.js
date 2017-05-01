class AppStatusesSelectorController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        ctrl.$onInit = onInit
        
      
    function onInit(){

     ctrl.statuses = {1 : {text: 'started'}, 
                      8 : {text: 'cancelled'},
                      10: {text:'submitted'},
                      11: {text:'in review'},
                      12: {text:'denied'},
                      13: {text:'accepted'},
                      30: {text:'arrived'},
                      70: {text:'alumni'}
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
