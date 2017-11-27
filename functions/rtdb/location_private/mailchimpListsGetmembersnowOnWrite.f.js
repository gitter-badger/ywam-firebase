var functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.

var moment = require('moment');
const notification = require('../../notification').notification;

var Mailchimp = require('mailchimp-api-v3')
 
exports = module.exports =   functions.database.ref('/location_private/mailchimp/lists/{list}/getmembersnow')
    .onWrite(event => {
        if(event.data.val()){
          return  event.data.ref.parent.once('value').then(function(list){
                var list_name = list.val().name


           

            var p=[]
         return   admin.database().ref('/location_private/mailchimp').once('value').then(function(snap){

            var list_id = snap.val().lists[event.params.list].id
             var api_key = snap.val().api_key

            var mailchimp = new Mailchimp(api_key);


            mailchimp.get('/lists/'+list_id+'/members')
                    .then(function(results) {
                        
                        results.members.forEach(function(member){
                            //  console.log(member)
                         var key =  member.email_address.replace(/[/[\]'.@]/g, "");//because firebase does not like . and @ in keys
                          p[p.length] =  admin.database().ref('/email_user_index/'+key).once('value').then(function(snap){
                           
                           if(snap.val()){
                                  console.log(snap.val().firebase_id)
                                  var updates ={ service: 'mailchimp',
                                                status:member.status,
                                                name: list_name,
                                                // data : member ,
                                                stats : member.stats,
                                                signup_date: moment(member.timestamp_opt).format('x') 
                                            }
                                  var list_id = member.list_id
                                  return admin.database().ref('/crm/'+snap.val().firebase_id+'/mailing_lists/'+list_id).update(updates)
                           }else{
                               console.log('email not in our index yet')
                           }

                         })
                        })
                       



                  return Promise.all(p)
                   })
                    })
                    .catch(function (err) {
                    console.log(err)
                    })
            })

        }})
