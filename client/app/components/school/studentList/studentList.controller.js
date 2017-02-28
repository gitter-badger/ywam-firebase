class StudentListController {
    /* @ngInject */
  constructor($stateParams, $firebaseObject,$timeout,School, Auth) {
    var ctrl = this;
        ctrl.selected = [];
        ctrl.filterList = filterList;
        ctrl.setStatusSelected = setStatusSelected
        ctrl.query = {
                      order: ['meta.status','user.first_name'],
                      limit: 5,
                      page: 1
                    };
      
  

    var school_id = $stateParams.school_id;
        ctrl.apps =  School.getApps(school_id)
    // ctrl.apps = []
    //ctrl.loading_promise = $q.defer();
        
        ctrl.statuses = {1 : {text: 'started'}, 
                      8 : {text: 'cancelled'},
                      10: {text:'submitted'},
                      11: {text:'in review'},
                      12: {text:'denied'},
                      13: {text:'accepted'},
                      30: {text:'arrived'}
                    };
     ctrl.statuses[10].active = true;
     ctrl.statuses[11].active = true;
     ctrl.statuses[13].active = true;
     ctrl.statuses[30].active = true;
     
      function filterList(item){
          var show = false;
         if(ctrl.statuses[item.meta.status] && ctrl.statuses[item.meta.status].active)
           show =  true;
          return show;
        };

     function setStatusSelected(status_num)
     {    var user_id = Auth.$getAuth().uid;
          ctrl.selected.forEach(function(item){
          console.log('seting status of '+item.id)

           firebase.database().ref('applications/' +item.id + '/meta/status').set(status_num);
           firebase.database().ref('applications/' +item.id + '/meta/statuses/'+status_num +'/date').set(new Date().getTime())
           firebase.database().ref('applications/' +item.id + '/meta/statuses/'+status_num +'/user_id').set(user_id)

         
        })



     }   
   
          
    
  }
}

export default StudentListController;
