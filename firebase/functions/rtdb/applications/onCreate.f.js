var functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

const notification = require('../../notification').notification;

//applications should really only be created with the /for/user_id

exports = module.exports = functions.database.ref('/applications/{appId}').onCreate(event => {
    const app = event.data.val();
    var p1 = []
    var p2 = [] //secondary array of promises 
    var contact = {}
    var school_public ={}
    var url = ''

    console.log('adding start time', event.params.appId);
            // add created timestamp & status of 1
    var metadata = {
        status: 1,
        statuses: { 1: { time: new Date().getTime() } }
    }

    var appRef = event.data.adminRef

    //Save meta data
    p1[p1.length] = appRef.child('meta').set(metadata)

    // get users name 
    p2[p2.length] = admin.database().ref('/profiles/' + app.for.user_id + '/contact/').once('value').then(function (snap) {
        contact = snap.val()
    })

    //get url for link
    p2[p2.length] = admin.database().ref('/location_public/meta/').once('value').then(function (snap) {
        url = snap.val().apply_url
    })
    
    //if school get school name
    if(app.for.school_id){
        p2[p2.length] = admin.database().ref('/schools/'+app.for.school_id+'/public').once('value').then(function (snap) {
            school_public = snap.val()
        })
    }

    //once all secondary promises are done
    p1[p1.length] = Promise.all(p2).then( () => {

        var text = ''

        switch (app.for.type) {
            case 'school':
                text += school_public.name
                url += '/school/' + app.for.school_id
                break;
            case 'staff':
                text += 'Staff'
                url += '/staff'
                break;
        }

        url += '/application/' + event.params.appId + '/'

        var message = '<' + url + '|' + text + ' Application Started! > '

        if (contact)
            message += 'by: ' + contact.first_name + ' ' + contact.last_name;

        return notification(message, app.for.type + '_application_started')
    })

    //Finally when all primary promises are done    
    return Promise.all(p1)    
})