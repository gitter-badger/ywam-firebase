var functions = require('firebase-functions');
const admin = require('../config.js').admin;
const admin2 = require('../config.js').secondAdmin;


exports.generate = functions.database.ref('/reference_tokens/{id}/token_requested')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
    //   console.log(original)
      if(original){
        var uid = event.params.id
        var privlages = {avatar_access: 'mB9H1NoELsUq37yZ78nhidDeaDc2'}

        //See https://github.com/firebase/firebase-functions/issues/3
        //and
        //http://stackoverflow.com/questions/42717540/firebase-cloud-functions-createcustomtoken/42724251#42724251
   return  new Promise(function(resolve, reject){
        admin2.auth().createCustomToken(uid, privlages)
              .then(function(customToken) {
                console.log(customToken)
                // Send token back to client
                var data =  {auth_token:customToken,
                             token_requested:false}
                  admin.database().ref('/reference_tokens/'+event.params.id).update(data ).then((res)=>{
                      console.log(res)
                   return    resolve('done')
                  }).catch(function(error) {
                        reject('error')
                        console.log("Error saving to db:", error);
                    });

            })
            .catch(function(error) {
                reject('error')
                console.log("Error creating custom token:", error);
            });

        })


      }else{
          return
      }

    })