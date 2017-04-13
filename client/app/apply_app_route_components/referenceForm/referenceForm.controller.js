class ReferenceFormController {
   /* @ngInject */
  constructor($stateParams,$timeout,$translate, Auth,Site,$firebaseObject,$scope) {
    var ctrl = this;
        Site.hideHeaderLinks=true;
        ctrl.loading = true;
      ctrl.submit=submit;

      ctrl.rating={1:"171",2:"172",3:"173",4:"174",5:"175"}

      ctrl.$onInit = onInit 

                   function onInit(){ 
                   var tokenRef = firebase.database().ref('/reference_tokens/'+$stateParams.hash)
                    tokenRef.on('value',function(snap){
                        // console.log(snap.val())
                              var token = snap.val().auth_token;
                        
                        if(!token)
                            {
                               tokenRef.child("token_requested").set(true) 
                            }
                        else{
                              ctrl.ref = snap.val().ref;
                            // console.log(token)
                                    Auth.$signInWithCustomToken(token).then(function(reslt){
                                        // console.log(reslt)
                                        startUpReference()
                                    }).catch(function(error) {
                                    // Handle Errors here.
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    if (errorCode === 'auth/invalid-custom-token') {
                                        console.log('auth/invalid-custom-token')
                                        tokenRef.child("token_requested").set(true) 
                                       
                                    } else {
                                        console.error(error);
                                    }
                                    });
                            }

                   })

                   }


function startUpReference(){

        var metaRef = firebase.database().ref(ctrl.ref).child('meta')
       var formRef= firebase.database().ref(ctrl.ref).child('form')
       $firebaseObject(formRef).$bindTo($scope, "form")
        // console.log(Ref);
            metaRef.on('value',function(snap){
            ctrl.meta = snap.val()
                 $translate.use(ctrl.meta.language);
                if(ctrl.meta.for.school_id){
               firebase.database().ref('/schools/'+ctrl.meta.for.school_id+'/public/').on('value',function(snap){

                   ctrl.school = snap.val();
                   console.log(ctrl.school);
                   $timeout();
                   ctrl.loading=false;
                   formRef.child('accessed').set(new Date().getTime())
               }) 
                }
                console.log(ctrl.meta);
                
            },function(err){
            console.log(err);
        })

}
              
                                                                                                   
 function submit(form){
     console.log(form)
     if(form.$valid){
         $scope.form.submit=true;
         
     }
 }              
        
  
  }}
                                                                                                    
                                                                                                    


export default ReferenceFormController;
