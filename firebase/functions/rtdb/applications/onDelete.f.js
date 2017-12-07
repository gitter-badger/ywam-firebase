var functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.


exports = module.exports = functions.database.ref('/applications/{appId}')
  .onDelete(event => {

    const app_id = event.params.appId
    const app = event.data.previous.val()
    const user_id = app.for.user_id
        
    var p = []

    if(app.for.type == 'staff'){
      p[p.length] = admin.database().ref('location' ).child('alumni_staff_index').child(user_id).remove()
      p[p.length] = admin.database().ref('location' ).child('current_staff_index').child(user_id).remove()
      p[p.length] = admin.database().ref('location' ).child('staff_app_index').child(user_id).remove()
    }
    if(app.for.type == 'school'){
      const school_id = app.for.school_id
      p[p.length] = admin.database().ref('/schools/' + school_id + '/app_index/' + app_id ).remove()
      
    }

    p[p.length] = admin.database().ref('/profiles/' + user_id + '/app_index/' + app_id).remove()

    return Promise.all(p).then( () => {
      console.log('Application ' + app_id +' deleted... removed from indexes')
    })
})