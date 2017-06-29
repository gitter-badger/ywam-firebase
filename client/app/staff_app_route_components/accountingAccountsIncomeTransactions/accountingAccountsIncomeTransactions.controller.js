class AccountingAccountsIncomeTransactionsController {
   /* @ngInject */
  constructor($filter,ngAudio, $stateParams, $timeout, Site) {
    var ctrl = this;
        
          ctrl.transactions =[]
        ctrl.markBooked = markBooked
        ctrl.toggleType = toggleType;
        ctrl.setFund = setFund
        ctrl.linkContact = linkContact
    
    var sound = ngAudio.load("sounds/1.mp3"); // returns NgAudioObject
       

        var Transactions = firebase.database().ref('/finance_accounts/'+$stateParams.account_id+'/income_transactions')
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

              getPayerName(index)                      
              getBookedByName(index)
              highLightStuff(index)
              $timeout()
        }

        
        // ctrl.transactions = $firebaseArray(Transactions);

        firebase.database().ref('/funds')
       .on('value',function(snap){
          ctrl.funds = snap.val()
        })
        // Ref.on('value',function(snap){
        //   ctrl.transactions = snap.val().transactions
        // })

        function getPayerName(index){
         var uid = ctrl.transactions[index].firebase_user_id
          if(uid){
          firebase.database().ref('profiles/'+uid+'/contact').once('value',(snap)=>{
              ctrl.transactions[index].payer_name = snap.val().first_name +' '+ snap.val().last_name
          }) }}

         function getBookedByName(index){
          var uid = ctrl.transactions[index].booked_by_id
          if(uid){
          firebase.database().ref('profiles/'+uid+'/contact').once('value',(snap)=>{
              ctrl.transactions[index].booked_by_name = snap.val().first_name.charAt(0)  +'.'+ snap.val().last_name.charAt(0)+'.'
          }) }}  

          function highLightStuff(index){
          var fund_id = ctrl.transactions[index].fund_id
          var memo = ctrl.transactions[index].memo
          if(memo){
          if(fund_id){
            var searchstring =  new RegExp(fund_id,"ig");
            memo =  memo.replace(searchstring, '<span class="highlight-fund" >'+fund_id+'</span>');
         }

            memo =  memo.replace(/D-/i, '<span class="highlight-donation" >D-</span>');
         
            ctrl.transactions[index].memo = memo
         $timeout()
          }//end if memo at all
        }  

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

       function toggleType(item){
          var donation = !item.donation
          var payment = !item.payment
          if(donation&&payment)//if both 
             payment = null
          
          var updates ={donation: donation,
                        payment:payment}
           Transactions.child(item.id).update(updates)
          
        }
          function setFund(item){
          Transactions.child(item.id).child('fund_id').set(item.fund_id).then(function(){
              sound.play()
          })
          // Transactions.child(item.id).child('log_fund_user').set(Site.user.id)
        }


        function linkContact($event,item){
          var key = `/finance_accounts/${$stateParams.account_id}/income_transactions/${item.id}`  
          var template = `<accounting-transaction-link-to-contact key="'${key}'"></accounting-transaction-link-to-contact>`

          Site.showDialog($event,template)
   
     

 
        }


  }
}

export default AccountingAccountsIncomeTransactionsController;
