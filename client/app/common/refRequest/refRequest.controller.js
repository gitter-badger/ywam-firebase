class RefRequestController {
    /* @ngInject */
  constructor($firebaseObject, $timeout, Site) {
   var ctrl = this;
       ctrl.sendRef1 = sendRef1
       ctrl.sendRef2 = sendRef2 
       ctrl.$onInit=onInit;

     function onInit()
      {
          console.log(ctrl.appId)

          
   var ref1Ref = firebase.database().ref('applications/'+ctrl.appId +'/reference1/' ).child('user_set')
   var ref2Ref = firebase.database().ref('applications/'+ctrl.appId +'/reference2/' ).child('user_set')

    ref1Ref.on('value',(snap1)=>{ 

       ctrl.reference1 = snap1.val()
        if( ctrl.reference1 && !ctrl.reference1.language){
             ctrl.reference1.language =   ''+Site.language //Set language for reference default to what the applicant has  
             }
         checkSubmited()//and check if everything is in now..       
    })
    ref2Ref.on('value',(snap2)=>{

         ctrl.reference2 = snap2.val()
        if(ctrl.reference2 && !ctrl.reference2.language){
              ctrl.reference2.language = ''+Site.language //Set language for reference default to what the applicant has
        }
           checkSubmited()//and check if everything is in now..       
        })
    
     }

      function checkSubmited(){
         $timeout(function(){
         // console.log('checking references')
          ctrl.isValid = false;
          if( ctrl.reference1 && ctrl.reference2 &&
             ( ctrl.reference1.sent || ctrl.reference1.send_requested) && 
             ( ctrl.reference2.sent || ctrl.reference2.send_requested ))
                ctrl.isValid = true;
            })
      }


       function sendRef1(){

            var data =  ctrl.reference1
                data.send_requested = true
               firebase.database().ref('applications/'+ctrl.appId +'/reference1/' ).child('user_set').set(data)
           
       }

       function sendRef2(){
            var data =  ctrl.reference2
                data.send_requested = true
                firebase.database().ref('applications/'+ctrl.appId +'/reference2/' ).child('user_set').set(data)
       }

  }
      
}

export default RefRequestController;
