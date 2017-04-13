class SignUpController 
{
    /* @ngInject */
    constructor(Auth,$stateParams,$state) 
    {
        var ctrl=this;
        ctrl.signUp=signUp;      
        ctrl.error_key="";
        function signUp()
        {
            Auth.$createUserWithEmailAndPassword(ctrl.email,ctrl.password)
            .then
            (
                function(res)
                {
                    console.log(res.uid);
                    var data= {com:{first_name:ctrl.first_name, last_name:ctrl.last_name,email:ctrl.email}}
                    firebase.database().ref("profiles/"+res.uid).set(data)
                    if($stateParams.app_for){
                        $state.go('start',{app_for:$stateParams.app_for})
                    }
                    else{
                        $state.go('home')
                    }
                }
            )
            .catch
            (
                function(error)
                {
                    console.log(error)
                    ctrl.error_key = error.code.replace(/[/[\]'.]/g, "");
                    console.log('error_key for translation:'+ ctrl.error_key)

                }
            )
        }      
    }
}

export default SignUpController;
