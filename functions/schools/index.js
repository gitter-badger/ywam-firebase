var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const notification = require('../notification').notification;
const moment = require('moment');


exports.app_index_trigger = functions.database.ref('/schools/{schoolId}/app_index')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
     // const app_index = event.data.val();
        var school_id = event.params.schoolId

            // update app counts
            var started_count =0;
            var submited_count =0;
            var cancelled_count =0;
            var accepted_count = 0;
            var denied_count = 0;
            var arrived_count = 0;
            var total_count = 0;
            var promises = []
            var stats = {start:[],
                        submit:[],
                        accepted:[]}
          

            event.data.forEach(function(item){
                var key = item._childPath //don't know what is up here.. perhaps they change it to be .key

           var promise = admin.database().ref('applications/'+key+'/meta/statuses').once('value').then(function(snap){
               var statuses = snap.val()
            //    console.log(statuses)
                 

                    if(statuses && statuses[1] && statuses[1].time){
                    var week =   moment(statuses[1].time).format("YYYY-WW")
                    if(!stats.start[week])
                        stats.start[week]=0 

                        stats.start[week]++
                    }

                    if(statuses && statuses[10] && statuses[10].time){
                    var week =   moment(statuses[10].time).format("YYYY-WW")
                    if(!stats.submit[week])
                        stats.submit[week]=0 

                        stats.submit[week]++
                    }

                    if(statuses && statuses[13] && statuses[13].time){
                    var week =   moment(statuses[13].time).format("YYYY-WW")
                    if(!stats.accepted[week])
                        stats.accepted[week]=0 

                        stats.accepted[week]++
                    }


           })

           promises.push(promise)

            var status = item.val()
            // console.log(status)   
            if(status < 8)
            started_count++

            if(status == 8)
            cancelled_count++

            if(status == 10)
            submited_count++

            if(status == 12)
            denied_count++
            
            if(status == 13)
            accepted_count++
                
            if(status == 30)
            arrived_count++

            total_count++



             })
        
            var updates =   {started : started_count,
                            denied : denied_count,
                            submited : submited_count,
                            accepted : accepted_count,
                            arrived : arrived_count,
                            total : total_count }

        var promise = admin.database().ref('/schools/'+school_id+'/count').update(updates)
         promises.push(promise) 

          console.log(promises.length + ' promises to resolve')
          return Promise.all(promises).then(function(){
             return admin.database().ref('/schools/'+school_id+'/stats/').set(stats)
          }) 

           
    })