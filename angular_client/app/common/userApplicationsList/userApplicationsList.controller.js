class UserApplicationsListController {
   /* @ngInject */
 constructor(Auth,$timeout,$state,$firebaseObject) 
    {
      var ctrl=this;
        ctrl.applicationList=[];
        ctrl.contiueApplication=applyNow;
        ctrl.$onInit=function()
        {
          if(!ctrl.userId)
           ctrl.userId = Auth.$getAuth().uid;
            
            
            firebase.database().ref("profiles/"+ctrl.userId+"/app_index").on("value",function(snap)
            {
              ctrl.applicationList=[];
              snap.forEach(function(appsnap){
              var app=appsnap.val();

                // console.log(app.for)
              if(app.status < 30){
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

              }//end if status less than 30

              })

          })
      }
        
         var refLoc= firebase.database().ref("location_public/application_types/")
         ctrl.appTypes=$firebaseObject(refLoc)
        
        
    function applyNow(app){
    
        if(app.for.school_id)
     $state.go('start',{app_for:'school_' + app.for.school_id});
        if(app.for.type=='staff')
     $state.go('start',{app_for:'staff'});

    }
  }
}

export default UserApplicationsListController;
