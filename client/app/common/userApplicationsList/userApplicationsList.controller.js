class UserApplicationsListController {
   /* @ngInject */
 constructor(Auth,$timeout,$state) 
    {
      var ctrl=this;
        ctrl.applicationList=[];
        ctrl.contiueApplication=applyNow;
        ctrl.$onInit=function()
        {
          if(!ctrl.userId)
           ctrl.userId = Auth.$getAuth().uid;
            
            
            firebase.database().ref("profiles/"+ctrl.userId+"/app_index").on("child_added",function(snap)
            {
              var app=snap.val();
                  app.id=snap.key;
                
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
      }
    function applyNow(app){
    
        if(app.for.school_id)
     $state.go('start',{app_for:'school_' + app.for.school_id});
        if(app.for.type=='staff')
     $state.go('start',{app_for:'staff'});

    }
  }
}

export default UserApplicationsListController;
