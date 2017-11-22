const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.


export let schoolPublicOnline =  functions.database.ref('/schools/{schoolId}/public/online')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
        const online = event.data.val();
        const school_id = event.params.schoolId
        var p = []
        if(online)
        return admin.database().ref('/location_public/online_schools/'+school_id).set(true)
        else
        return admin.database().ref('/location_public/online_schools/'+school_id).remove()    


    })