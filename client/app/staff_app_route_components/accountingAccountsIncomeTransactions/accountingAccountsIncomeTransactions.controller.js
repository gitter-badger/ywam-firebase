class AccountingAccountsIncomeTransactionsController {
   /* @ngInject */
  constructor($filter,ngAudio, $stateParams, $timeout, Site) {
    var ctrl = this;
        
          ctrl.transactions =[]
        ctrl.markBooked = markBooked
        ctrl.toggleType = toggleType;
        ctrl.searchContact = searchContact
    
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
           console.log(index)

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
          
           Transactions.child(item.id).child('donation').set(donation)
           Transactions.child(item.id).child('payment').set(payment)
          
        }

        function searchContact(){
            if(ctrl.searchString.length>2){
            var string = ctrl.searchString.replace(/[/[\]'.]/g, "").toLowerCase()
                 console.log(string)
            
            if(string){ 
           
             firebase.database().ref('search/queries').child(string).child('query').set(ctrl.searchString)
        
      
      var ref = firebase.database().ref('search/results').child(string)
        .on('value',  function fn(snap) { 
           
           if( snap.val() !== null ) {     // wait for data
          
              ctrl.results = snap.val().hits
               ctrl.searching = false;

          }
    
             
        });

     
       }//if string

    
     }//if Site.searchString
     

 
        }


  }
}

export default AccountingAccountsIncomeTransactionsController;
