const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.


// This is here to update /location/school_index

exports = module.exports =  functions.database.ref('/schools/{schoolId}')
    .onCreate(event => {
      
        const school_id = event.params.schoolId
        
        return admin.database().ref('/location/schools_index/'+school_id).set(true)
       

    })