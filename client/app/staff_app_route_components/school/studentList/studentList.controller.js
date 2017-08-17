class StudentListController {
    /* @ngInject */
  constructor($stateParams, $firebaseObject,$timeout,School, Auth,Site) {
    var ctrl = this;
        ctrl.selected = [];
        ctrl.filterList = filterList;
        ctrl.setStatusSelected = setStatusSelected
        ctrl.$onInit = onInit
        ctrl.query = {
                      order: ['meta.status','user.first_name'],
                      limit: 5,
                      page: 1
                    };
    var appsRef = firebase.database().ref('/applications')  
                    
    function onInit(){
        ctrl.school_id = $stateParams.school_id;
      
      var appIndexRef = firebase.database().ref('/schools/'+ctrl.school_id +'/app_index')
          appIndexRef.on('value', function(indexSnap){

            ctrl.apps =[]
            indexSnap.forEach(function(appSnap){
             
                  var data = {id: appSnap.key }
                  var index =  ctrl.apps.push(data)
                     console.log(index)
                     
                      index--
                  
                    getAppFor(index)
                    getAppMeta(index)

            })//end foreach appindex  
          })
      
         
      function getAppFor(index){

              var appId=  ctrl.apps[index].id
              
              firebase.database().ref('/applications').child(appId).child('for').once('value', function(appForSnap) {
                        if(appForSnap.val()){
                         ctrl.apps[index].for = appForSnap.val()
                         getProfileCom(appForSnap.val().user_id,index)
                         
                        }else{
                          console.error('no Application actually found for this index'+ appId)
                        }
                } )//end on value
            
      }     

      function getAppMeta(index){
               var appId =  ctrl.apps[index].id
                //  console.log('looking up app/meta node : '+ appId)
            var appMeta  =    firebase.database().ref('/applications').child(appId).child('meta')//.on('value', function(appMetaSnap) {
                 ctrl.apps[index].meta = $firebaseObject(appMeta)
              //   appMeta.once('value', appMetaSnap =>{
                 
              //    if(appMetaSnap.val()){
              //     ctrl.apps[index].meta = appMetaSnap.val()

              //  }


              //   })     
                     
      }

      function getProfileCom(user_id, index){
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/contact' )
                      userRef.once('value',function(snapshot) { 
                                                  if(snapshot.val()){
                                                  ctrl.apps[index].user  = snapshot.val()
                                                   $timeout();
                                                     getNationality(user_id, index)
                                                  }
                                                })
      }

      function getNationality(user_id, index){
                     
                   var userRef =   firebase.database().ref('/profiles/'+ user_id +'/passport/nation_id' )
                      userRef.once('value',function(snapshot) { 
                            if(snapshot.val()){
                            ctrl.apps[index].user.nation_id  = snapshot.val()
                            firebase.database().ref('phrases/nations/'+Site.language+'/'+snapshot.val()).once('value',function (snap){
                                    ctrl.apps[index].user.nationality = snap.val()                      
                                                   $timeout();
                                                })
                             }                    
                                                })
      }






    }
        
      
     
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
