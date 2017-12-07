class RefRequestController {
    /* @ngInject */
    constructor($firebaseObject, $timeout, Site,Auth,$mdDialog) {
        var ctrl = this;
        ctrl.sendRef1 = sendRef1
        ctrl.sendRef2 = sendRef2 
        ctrl.$onInit=onInit;
        ctrl.user_id = Auth.$getAuth().uid;
         ctrl.showAlertPrerenderedDialog = showAlertPrerenderedDialog;


        function onInit()
        {

            var profile_contact_ref =   firebase.database().ref('/profiles/' +ctrl.user_id+'/contact' );

            profile_contact_ref.once('value', (snap)=>{
                ctrl.prof_cont = snap.val();
            })

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


        function sendRef1()
        {
            console.log(ctrl.prof_cont.avatar_1080)
            console.log(ctrl.prof_cont.first_name)
            console.log(ctrl.prof_cont.last_name)
            console.log(ctrl.prof_cont.gender)

            if(ctrl.prof_cont.avatar_1080 && ctrl.prof_cont.first_name && ctrl.prof_cont.last_name && ctrl.prof_cont.gender)
            {
                var data =  ctrl.reference1
                data.send_requested = true
                firebase.database().ref('applications/'+ctrl.appId +'/reference1/' ).child('user_set').set(data)
            }
            else
            {
                console.log('WARNING');
                showAlertPrerenderedDialog()
            }
        }

        function sendRef2()
        {
            console.log(ctrl.prof_cont.avatar_1080)
            console.log(ctrl.prof_cont.first_name)
            console.log(ctrl.prof_cont.last_name)
            console.log(ctrl.prof_cont.gender)

            if(ctrl.prof_cont.avatar_1080 && ctrl.prof_cont.first_name && ctrl.prof_cont.last_name && ctrl.prof_cont.gender)
            {
                var data =  ctrl.reference2
                data.send_requested = true
                firebase.database().ref('applications/'+ctrl.appId +'/reference2/' ).child('user_set').set(data)
            }
            else
            {
                console.log('WARNING');
                showAlertPrerenderedDialog()
            }
        }
        
        function showAlertPrerenderedDialog() 
        {
            $mdDialog.show(
            {
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };

    }

}

export default RefRequestController;
