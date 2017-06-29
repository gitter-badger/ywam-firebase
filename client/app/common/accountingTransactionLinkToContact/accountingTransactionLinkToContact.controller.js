class AccountingTransactionLinkToContactController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.searchContact = searchContact
        ctrl.setContact = setContact
        ctrl.$onInit = function(){
         
              var Ref = firebase.database().ref(ctrl.key)
              Ref.on('value',function(snap){
                ctrl.transaction= snap.val()
                console.log(ctrl.transaction)
              })

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

    function setContact(uid){
      var Ref = firebase.database().ref(ctrl.key)
          Ref.child('firebase_user_id').set(uid).then(function(){
            Site.hideDialog()
          })

    }
  }
}

export default AccountingTransactionLinkToContactController;
