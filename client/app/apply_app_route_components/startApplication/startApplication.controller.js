class StartApplicationController {
   /* @ngInject */
  constructor(Auth,$state,$stateParams,Site) {

    var ctrl = this;
        ctrl.firebaseUser = Auth.$getAuth();
       
        var app_for = $stateParams.app_for;
        var meta_data = { };
   
   //School Applications
      if(app_for.indexOf('school') !== -1)
        { 
          var school_id = app_for.replace( /^\D+/g, ''); // replace all leading non-digits with nothing
          console.log('app appears to be for a school! school ID ' +school_id)
       //Check if is online
       firebase.database().ref('/location_public/online_schools/'+school_id)
        .once('value').then(function(snapshot) {
           if(snapshot.val() == true)
           {
                console.log('school ID ' +school_id + ' is infact open for registration')
                  //todo make a check if they are trying to start multible DTS.. have them cancelle one before starting another
                
                meta_data.school_id = school_id;
                meta_data.type = 0; //type 0 is school

           }
           else
           {
           console.log('school ID ' +school_id + ' is NOT open for registration')
           meta_data.type = null;
           }

          //run nextStep only after all info has been retrived
           nextStep()
         }, function(error){
           console.log(error)
         })
        }//end school

//Staff Appliations    
        if(app_for.indexOf('staff') !== -1)
        { 

          console.log('looks like a staff App')
          meta_data.type = 1; //type 1 is staff
           nextStep()
    
        }//end staff 




function nextStep(){
      console.log('running next step')
   // if logged in send them on their way to the actual application form 
 // any time auth state changes, add the user data to scope
    Auth.$onAuthStateChanged(function(firebaseUser) {
      ctrl.firebaseUser = firebaseUser;
      console.log('firebaseuser', firebaseUser.uid)
       

      if(firebaseUser){
            meta_data.user_id = firebaseUser.uid;

         ctrl.app_id = firebaseUser.uid +'_'+ app_for
        console.log('checking for app id '+ ctrl.app_id)
        ctrl.app_for_ref =   firebase.database().ref('/applications/' +ctrl.app_id+'/for');
      
        // does an app exist for this user for this thing
        ctrl.app_for_ref.once('value').then(function(snapshot) {
          var app_exists = snapshot.val();
              console.log(app_exists)
            if(app_exists){
            console.log('Application exists for' + app_for)
            $state.go('apply.application',{appId:ctrl.app_id});
        }
        else
        { //else it doesn't exist
            console.log('No app exists for' + app_for)
            create_app()
        }


        }, function(error){
            console.log('encountered error, trying to create new app anyways ',error) 
            create_app()
    }  );

       }//end if firebase user
    });

  }//end next step function
 
 function create_app(){
         
          console.log('running create app')
       
          //create it now if it passed all the above criteria 
          if(meta_data.type != null){
             ctrl.app_for_ref.set(meta_data)
             console.log('changing state to appliation form '+ctrl.app_id)
             $state.go('apply.application',{appId:ctrl.app_id});
          }
          else{
            console.log('Something went wrong' , meta_data)
          } 

 }


 }
}

export default StartApplicationController;
