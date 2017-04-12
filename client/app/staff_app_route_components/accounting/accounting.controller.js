class AccountingController {
  /* @ngInject */
  constructor(Site, Auth,  $firebaseArray,ngAudio ) {
       var ctrl = this;
       var sound = ngAudio.load("sounds/1.mp3"); // returns NgAudioObject
       var Ref = firebase.database().ref('paypal_transactions/'+Site.location_id)
       var RefOrdered = Ref.orderByChild("timestamp")

        
       ctrl.checkQB = checkQB 
       ctrl.checkDonation = checkDonation 
       ctrl.transactions = $firebaseArray(RefOrdered);

       function checkQB(item){
          Ref.child(item.transaction_id).child('in_quickbooks').set(item.in_quickbooks)
          Ref.child(item.transaction_id).child('quickbooks_user').set(Auth.$getAuth().uid)
         if(item.in_quickbooks){
         sound.play()
         Ref.child(item.transaction_id).child('quickbooks_time').set(firebase.database.ServerValue.TIMESTAMP)
        }
       }

       function checkDonation(item){
          Ref.child(item.transaction_id).child('in_donation').set(item.in_donation)
          Ref.child(item.transaction_id).child('donation_user').set(Auth.$getAuth().uid)
         if(item.in_donation){
         sound.play()
         Ref.child(item.transaction_id).child('donation_time').set(firebase.database.ServerValue.TIMESTAMP)
        }
       }

  }
}

export default AccountingController;
