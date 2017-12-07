class AccountingAccountsExpenseTransactionsController {
   /* @ngInject */
  constructor($filter,ngAudio, $stateParams, $timeout, Site) {
    var ctrl = this;
        
        ctrl.transactions =[]
        ctrl.markBooked = markBooked
        ctrl.reprocess= reprocess
    
    var sound = ngAudio.load("sounds/1.mp3"); // returns NgAudioObject
       

        var Transactions = firebase.database().ref('/finance_accounts/'+$stateParams.account_id+'/expense_transactions')
        var Settings = firebase.database().ref('/finance_accounts/'+$stateParams.account_id+'/settings')


        Transactions.on('child_added',function(snap){
            processTransaction(snap)
        })
         Transactions.on('child_changed',function(snap){
            processTransaction(snap)
        })

        Settings.once('value',(snap)=>ctrl.settings= snap.val())
        
        function processTransaction(snap){
             var data = snap.val()
               data.id = snap.key
            //check if transaction is already in the array?
           var tran =  $filter('filter')(ctrl.transactions, {id: snap.key}, true);
           var index = ctrl.transactions.indexOf(tran[0])
          //  console.log(index)

            if(index >-1){ //an update

                ctrl.transactions[index] = data 
               }else{ // something new
                index = ctrl.transactions.push(data );   
                index--                    
               }

              // getPayerName(index)                      
              getBookedByName(index)
             
        }

        
        // ctrl.transactions = $firebaseArray(Transactions);

        firebase.database().ref('/funds')
       .on('value',function(snap){
          ctrl.funds = snap.val()
        })
        // Ref.on('value',function(snap){
        //   ctrl.transactions = snap.val().transactions
        // })

        // function getPayerName(index){
        //  var uid = ctrl.transactions[index].firebase_user_id
        //   if(uid){
        //   firebase.database().ref('profiles/'+uid+'/contact').once('value',(snap)=>{
        //       ctrl.transactions[index].payer_name = snap.val().first_name +' '+ snap.val().last_name
        //   }) }}

         function getBookedByName(index){
          var uid = ctrl.transactions[index].booked_by_id
          // console.log(ctrl.transactions[index])
          if(uid){
          firebase.database().ref('profiles/'+uid+'/contact').once('value',(snap)=>{
              ctrl.transactions[index].booked_by_name = snap.val().first_name.charAt(0)  +'.'+ snap.val().last_name.charAt(0)+'.'
               $timeout()
        }) }}  

        function markBooked(item){
         var updates = {}
         updates.booked = item.booked
         updates.booked_by_id = Site.user.id
         if(item.booked){
         sound.play()
         updates.booked_time ='firebase.database.ServerValue.TIMESTAMP'
        }
         Transactions.child(item.id).update(updates)
       }

       function reprocess(item){
          Transactions.child(item.id).child('reprocess').set(true).then(function(){
              sound.play()
          })
       }

       
  }
}

export default AccountingAccountsExpenseTransactionsController;
