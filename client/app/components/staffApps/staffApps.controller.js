class StaffAppsController {
   /* @ngInject */
  constructor(Site, $firebaseArray, $timeout,$filter, $firebaseObject) {
    var ctrl = this;
        ctrl.apps = []
        ctrl.selected = [];
        ctrl.filterList = filterList;
        ctrl.transferSelected = transferSelected
        
        //get list of locations for the transfer to action
        var ref =   firebase.database().ref('locations_public')
        ctrl.locations = $firebaseArray(ref) 

        ctrl.query = {
                      order: ['meta.status','user.first_name'],
                      limit: 5,
                      page: 1
                    };
      
    var accepted_only = false

    var appIndexRef = firebase.database().ref('/locations/'+Site.location_id +'/staff_app_index')
          appIndexRef.on('value', function(indexSnap){

            indexSnap.forEach(function(appSnap){
                if(!accepted_only || appSnap.val() >= 13 ){
                  var data = {id: appSnap.key }
                  var index =  ctrl.apps.push(data)
                      index--
                    // console.log(index)
                    getAppFor(index)
                    getAppMeta(index)

                }//end if accepted only 
            })//end foreach appindex  
          })//end on value 
       
      var appsRef  = firebase.database().ref('/applications')
         
      function getAppFor(index){
              var appId=  ctrl.apps[index].id
            //  console.log('looking up app/for node : '+ appId)
              
              firebase.database().ref('/applications').child(appId).child('for').on('value', function(appForSnap) {
                          ctrl.apps[index].for = appForSnap.val()
                          getProfileCom(appForSnap.val().user_id,index)
                } )//end on value
            
      }     

      function getAppMeta(index){
               var appId =  ctrl.apps[index].id
                //  console.log('looking up app/meta node : '+ appId)
            var appMeta  =    firebase.database().ref('/applications').child(appId).child('meta')//.on('value', function(appMetaSnap) {
                      ctrl.apps[index].meta = $firebaseObject(appMeta)
                    //  console.log( ctrl.apps[index].meta)
                 //   })
      }

      function getProfileCom(user_id, index){
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/com' )
                       ctrl.apps[index].user = $firebaseObject(userRef)
                                                // .on('value',function(snapshot) { 
                                                //   ctrl.apps[index].user  = snapshot.val()
                                                //    $timeout(function() {  });
                                                // })
      }

    
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


      function filterList(item){
          var show = false;
         if(ctrl.statuses[item.meta.status] && ctrl.statuses[item.meta.status].active)
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
