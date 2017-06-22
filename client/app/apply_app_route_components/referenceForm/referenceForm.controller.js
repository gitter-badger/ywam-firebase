class ReferenceFormController {
   /* @ngInject */
    constructor($stateParams,$timeout,$translate, $firebaseObject,$scope, Site) {
        var ctrl = this;
        
        Site.hideHeaderLinks=true;
        
        ctrl.loading = true;
        ctrl.submit=submit;
        ctrl.avatar = 'img/default_avatar.png'; //updated later if avatar exists

        ctrl.rating={1:"171",2:"172",3:"173",4:"174",5:"175"}

        ctrl.$onInit = onInit 


        function onInit(){       
            console.log('running')

            var tokenRef = firebase.database().ref('/reference_tokens/'+$stateParams.hash)
            tokenRef.child('auth_token').on('value',function(snap){

                var token = snap.val();
                // console.log(token)
                if(!token)
                {
                    console.log('no token requesting one')
                    tokenRef.child("token_requested").set(true) 
                }
                else
                {
                    console.log('Token:  '+token)
                    //get ref 
                    tokenRef.child('ref').once('value',function(snap){ 

                        ctrl.ref = snap.val();
                        console.log(ctrl.ref)

                        firebase.auth().signInWithCustomToken(token).then(function(reslt){
                            // console.log(reslt)
                            startUpReference()
                        }).catch(function(error) 
                        {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/invalid-custom-token') 
                            {
                                console.log('auth/invalid-custom-token')
                                tokenRef.child("token_requested").set(true) 

                            } 
                            else 
                            {
                                console.error(error);
                            }
                        });

                    });//end value of ref        
                }

            })

        }


        function startUpReference(){
            console.log('starting up Reference')
            
            var metaRef = firebase.database().ref(ctrl.ref).child('meta')
            var formRef= firebase.database().ref(ctrl.ref).child('form')
            $firebaseObject(formRef).$bindTo($scope, "form")
            // console.log(Ref);
            metaRef.on('value',function(snap){
                ctrl.meta = snap.val()
                $translate.use(ctrl.meta.language);

                firebase.storage().ref(ctrl.meta.applicant_avatar)
                .getDownloadURL().then(function(url){
                    if(url)
                    ctrl.avatar = url
                    $timeout()

                })


                if(ctrl.meta.for.type=="school"){
                    firebase.database().ref('/schools/'+ctrl.meta.for.school_id+'/public/').on('value',function(snap){

                    ctrl.school = snap.val();
                    ctrl.typename=ctrl.school.name;
                    console.log(ctrl.school);

                    ctrl.loading=false;
                    formRef.child('accessed').set(new Date().getTime())
                    $timeout();
                    }) 
                }
                else if(ctrl.meta.for.type=="staff")
                {
                    ctrl.typename='staff';

                    ctrl.loading=false;
                    formRef.child('accessed').set(new Date().getTime())
                    $timeout();
                }
                console.log(ctrl.meta);

            },function(err)
            {
                console.log(err);
            })

        }


        function submit(form){
            console.log(form)
            if(form.$valid)
            {                
                $scope.form.submit=true;

            }
        }              

    }
}
                                                                                                    
                                                                                                    


export default ReferenceFormController;
