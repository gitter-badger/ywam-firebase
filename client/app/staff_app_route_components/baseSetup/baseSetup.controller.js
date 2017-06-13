class BaseSetupController {
   /* @ngInject */
  constructor($timeout,Site, $firebaseObject,$scope,angularLoad ) {
    var ctrl = this;
        
        ctrl.site = Site
        ctrl.linkBtn = linkBtn

        var Ref = firebase.database().ref('/location_public')
            Ref.on('value',function(snap){
              ctrl.location_public = snap.val()
            })

        var rolesRef = firebase.database().ref('/site_roles')
            rolesRef.on('value',function(snap){
              ctrl.roles = snap.val()
              $timeout()
            })    

        var locPrivateRef = firebase.database().ref('/location_private')

         $firebaseObject(locPrivateRef).$bindTo($scope, "$ctrl.location_private");

            // locPrivateRef.on('value',function(snap){
            //   ctrl.location_private = snap.val()
            //   $timeout()
            // })    

            function linkBtn(){
              angularLoad.loadScript('https://cdn.plaid.com/link/v2/stable/link-initialize.js').then(function() {
                // Script loaded succesfully.
                // We can now start using the functions from someplugin.js
                console.log('script loaded')

                console.log('plaid public key'+$scope.$ctrl.location_private.plaid.public_key)
                  var handler = Plaid.create({
                    clientName: 'Plaid Walkthrough Demo',
                    env: 'sandbox',
                    key: $scope.$ctrl.location_private.plaid.public_key , // Replace with your public_key to test with live credentials
                    product: ['auth', 'transactions'],
                    // webhook: '[WEBHOOK_URL]', // Optional – use webhooks to get transaction and error updates
                    selectAccount: false, // Optional – trigger the Select Account
                    onLoad: function() {
                      // Optional, called when Link loads
                    },
                    onSuccess: function(public_token, metadata) {
                      // Send the public_token to your app server.
                      // The metadata object contains info about the institution the
                      // user selected and the account ID, if `selectAccount` is enabled.
                    //  locPrivateRef.child('bank').set(public_token)
                     locPrivateRef.child('bank').set(metadata)  // includes public token
                      // $.post('/get_access_token', {
                      //   public_token: public_token,
                      // });
                    },
                    onExit: function(err, metadata) {
                      // The user exited the Link flow.
                      if (err != null) {
                        // The user encountered a Plaid API error prior to exiting.
                      }
                      // metadata contains information about the institution
                      // that the user selected and the most recent API request IDs.
                      // Storing this information can be helpful for support.
                    }
                  });

                 handler.open()



               
              }).catch(function() {
                  // There was some error loading the script. Meh
              })
            }


  }
}

export default BaseSetupController;
