
import dropin from './dropin.min.js';

class AccountingBrainTreeController {
   /* @ngInject */
  constructor($http) {
    var ctrl = this;
        
       var submitButton = document.querySelector('#submit-button');

$http.get('https://us-central1-staffapp-95f17.cloudfunctions.net/braintree-client_token').then(function(result){


 dropin.create({
       authorization: result.data,
       selector: '#dropin-container',
       paypal: {
    flow: 'checkout',
    amount: 10.00,
    currency: 'USD'
  }
     }, function (err, dropinInstance) {
       if (err) {
         // Handle any errors that might've occurred when creating Drop-in
         console.error(err);
         return;
       }
       submitButton.addEventListener('click', function () {
         dropinInstance.requestPaymentMethod(function (err, payload) {
           if (err) {
             // Handle errors in requesting payment method
           }

           // Send payload.nonce to your server
         });
       });
     });



})

    
    
  }
}

export default AccountingBrainTreeController;
