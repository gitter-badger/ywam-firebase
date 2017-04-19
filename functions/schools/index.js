var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const notification = require('../notification').notification;


exports.updateCount = functions.database.ref('/schools/{schoolId}/app_index')
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

            event.data.forEach(function(item){

            

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
        return admin.database().ref('/schools/'+school_id+'/count').update(updates) 
           
    })