class SiteStatsController {
   /* @ngInject */
  constructor($timeout) {
    var ctrl = this;
    // ctrl.siteStats=[]
        
       

        var Ref = firebase.database().ref('/clients').orderByKey().limitToLast(100)
        Ref.on('value',function(snap){
         
          ctrl.siteStats = snap.val()
         
          snap.forEach(function(client){

            angular.forEach(client.val().log , function(log,key){

              
              if(log.user_id){
                getName(client.key, key )
                // console.log(log.user_id)
              }
            })

          })

         

          $timeout()
         
         
        })

        function getName(client_key,log_key){
          // console.log(index)
          var user_id=  ctrl.siteStats[client_key].log[log_key].user_id
          console.log(user_id)
              firebase.database().ref('/crm/'+user_id+'/name' ).once('value',function(snap){
                ctrl.siteStats[client_key].log[log_key].name = snap.val()
             
          })

        }

  }
}

export default SiteStatsController;
