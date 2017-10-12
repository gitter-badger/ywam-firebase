class ProfileApplicationsListController {
   /* @ngInject */
  constructor($timeout,$state) {
    var ctrl = this;

        ctrl.applicationList=[];
        ctrl.goToApp = goToApp
        ctrl.$onInit=function()
        {
          if(!ctrl.userId)
             ctrl.userId = Auth.$getAuth().uid;
            
            
            firebase.database().ref("profiles/"+ctrl.userId+"/app_index").on("value",function(snap)
            {
              ctrl.applicationList=[];
              snap.forEach(function(appsnap){
              var app=appsnap.val();
                  app.id=appsnap.key;
                
                if(app.for.school_id )
                {
                        firebase.database().ref("schools/"+app.for.school_id+"/public").once("value",function(snap)
                        {
                            app.school=snap.val();
                            ctrl.applicationList.push(app);
                            $timeout(function(){});
                            
                        })
                }
                else{
                    ctrl.applicationList.push(app);
                }


              })

          })
      }

      function goToApp(app){
        //if staff app
        if(app.for.type =='staff'){
          $state.go('staff.application',{app_id:app.id});
        }

        if(app.for.type =='school')
        $state.go('school.application',{app_id:app.id, school_id: app.for.school_id});
        
    
      }
  }
}

export default ProfileApplicationsListController;
