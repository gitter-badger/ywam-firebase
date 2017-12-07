class AccountingAccountsController {
   /* @ngInject */
  constructor($rootScope,$state,$stateParams, $timeout) {
    var ctrl = this;
        
        $rootScope.$on('$viewContentLoaded',function(){
           ctrl.current = $state.current.name+'_'+$stateParams.account_id
           ctrl.current= ctrl.current.replace(".income", "");
           ctrl.current= ctrl.current.replace(".expense", "");
          //  console.log(ctrl.current)
          })
       

        var Ref = firebase.database().ref('/finance_accounts')
        Ref.on('value',function(snap){
          ctrl.accounts = snap.val()
          $timeout()
        })


// var handler = Plaid.create({
//   clientName: 'Plaid Walkthrough Demo',
//   env: 'development',
//   key: 'e839eafd8ac76cd92584f65e704a68', // Replace with your public_key to test with live credentials
//   product: ['transactions'],
//   webhook: 'https://us-central1-staffapp-95f17.cloudfunctions.net/plaid-webhook', // Optional – use webhooks to get transaction and error updates
//   selectAccount: false, // Optional – trigger the Select Account
//   onLoad: function() {
//     // Optional, called when Link loads
//   },
//   onSuccess: function(public_token, metadata) {
//     // Send the public_token to your app server.
//     // The metadata object contains info about the institution the
//     // user selected and the account ID, if `selectAccount` is enabled.
//     console.log(public_token)
//     firebase.database().ref('location_private/bank/public_token').set(public_token)
//     // $.post('/get_access_token', {
//     //   public_token: public_token,
//     // });
//   },
//   onExit: function(err, metadata) {
//     // The user exited the Link flow.
//     if (err != null) {
//       // The user encountered a Plaid API error prior to exiting.
//     }
//     // metadata contains information about the institution
//     // that the user selected and the most recent API request IDs.
//     // Storing this information can be helpful for support.
//   }
// });

//  ctrl.linkBtn =  function(){handler.open();}


  }
}

export default AccountingAccountsController;
