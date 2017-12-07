class StaffAppsController {
   /* @ngInject */
  constructor(Site, $firebaseArray, $timeout,$filter, $firebaseObject) {
    var ctrl = this;
        ctrl.apps = []
        ctrl.selected = [];
        ctrl.filterList = filterList;
        ctrl.transferSelected = transferSelected

        ctrl.query = {
                      order: ['meta.status','user.first_name'],
                      limit: 5,
                      page: 1
                    };
      
    var accepted_only = false

    var appIndexRef = firebase.database().ref('/location/staff_app_index')
          appIndexRef.on('value', function(indexSnap){
           
            indexSnap.forEach(function(appSnap){
                if(!accepted_only || appSnap.val() >= 13 ){
                  var data = {id: appSnap.key }
                  var index =  ctrl.apps.push(data)
                      index--
                    console.log(index)
                    getAppFor(index)
                    getAppMeta(index)

                }//end if accepted only 
            })//end foreach appindex  
          })//end on value 
       
      var appsRef  = firebase.database().ref('/applications')
         
      function getAppFor(index){
              var appId=  ctrl.apps[index].id
            //  console.log('looking up app/for node : '+ appId)
              
              firebase.database().ref('/applications').child(appId).child('for').once('value', function(appForSnap) {
                          if(appForSnap.val()){
                          ctrl.apps[index].for = appForSnap.val()
                          getProfileCom(ctrl.apps[index].for.user_id,index)
                          }
                } )//end on value
            
      }     

      function getAppMeta(index){
               var appId =  ctrl.apps[index].id
                //  console.log('looking up app/meta node : '+ appId)
          firebase.database().ref('/applications').child(appId).child('meta')
            .once('value', function(appMetaSnap) {
                      ctrl.apps[index].meta = appMetaSnap.val()
                  
                   })
      }

      function getProfileCom(user_id, index){
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/contact' )
                      //  ctrl.apps[index].user = $firebaseObject(userRef)
                                                .once('value',function(snapshot) { 
                                                  ctrl.apps[index].user  = snapshot.val()
                                                   $timeout();
                                                })
      }

    
       


      function filterList(item){
          var show = false;
         if(ctrl.statuses &&  item.meta && ctrl.statuses[item.meta.status] && ctrl.statuses[item.meta.status].active)
           show =  true;
          return show;
        };
   

      function transferSelected(location_id){

        console.log('transfer to location '+ location_id);
        
        ctrl.selected.forEach(function(item){
          console.log(item.id)

// firebase.database().ref('/applications').child(item.id).child('for').child('staff_location_id').set(location_id)
            
            var data = {staff_location_id:location_id}
          //  appsRef.child(item.id).child('for').child('staff_location_id').set(location_id)
          //   .catch(function(error){
          //     console.log(error)
          //   })

               appsRef.child(item.id).child('for').update(data)
            .catch(function(error){
              console.log(error)
            })
         
        })
        




      }

}
}

export default StaffAppsController;
