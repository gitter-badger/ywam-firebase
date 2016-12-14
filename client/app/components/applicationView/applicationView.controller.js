class ApplicationViewController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject,$timeout, $document,Auth) {
   var ctrl = this;
       ctrl.calculateAge = calculateAge
       ctrl.languages = {}
       ctrl.app_id = $stateParams.app_id;
  
    var appRef = firebase.database().ref('applications').child(ctrl.app_id)
        appRef.on('value',function(snap){
        
            ctrl.app = snap.val()
            ctrl.user_id = snap.val().for.user_id;
        var userRef = firebase.database().ref('profiles').child(ctrl.user_id)
       
        userRef.on('value',function(userSnap){
        ctrl.user = userSnap.val()
       
        userRef.child('com/languages').on('child_added',function(snap){
         console.log(snap.key)
          //look up languages
          var lang = snap.key;
            var langRef = firebase.database().ref('languages').child(lang)
                langRef.on('value',function(snap){
                  console.log(snap.val())
                  ctrl.languages[snap.key] = snap.val();
                  ctrl.languages[snap.key].prof = ctrl.user.com.languages[snap.key]
                  $timeout(function(){});  
              })})//end on ref languages

         userRef.child('passport/nation_id').on('value',(snap)=>{
            //  console.log(snap.val())
             var natRef = firebase.database().ref('/phrases/nations/en/').child(snap.val())
                 natRef.on('value',(snap)=>{ctrl.user.com.nationality=snap.val()
                     console.log(snap.val())})
         })   

         })//end userRef value


         ctrl.ref_chart_labels = ['ambition', 'communication', 'emotion', 'initiative', 'leadership', 
            'moral', 'organization','punctual','reliable','servanthood','teachability','teamwork'];
       ctrl.ref_chart_series = ['Reference 1', 'Reference 2'];
      ctrl.ref_chart_options = { scales: {
                                            yAxes: [{
                                                display: false,
                                        
                                            }]
                                }  
                                }
     
        var ref1data=[]
            ref1data.push(ctrl.app.reference1.form.scale.ambition)
            ref1data.push(ctrl.app.reference1.form.scale.communication)
            ref1data.push(ctrl.app.reference1.form.scale.emotion)
            ref1data.push(ctrl.app.reference1.form.scale.initiative)
            ref1data.push(ctrl.app.reference1.form.scale.leadership)
            ref1data.push(ctrl.app.reference1.form.scale.moral)
            ref1data.push(ctrl.app.reference1.form.scale.organization)
            ref1data.push(ctrl.app.reference1.form.scale.punctual)
            ref1data.push(ctrl.app.reference1.form.scale.reliable)
            ref1data.push(ctrl.app.reference1.form.scale.servanthood)
            ref1data.push(ctrl.app.reference1.form.scale.teachability)
            ref1data.push(ctrl.app.reference1.form.scale.teamwork)

        var ref2data=[]
            ref2data.push(ctrl.app.reference2.form.scale.ambition)
            ref2data.push(ctrl.app.reference2.form.scale.communication)
            ref2data.push(ctrl.app.reference2.form.scale.emotion)
            ref2data.push(ctrl.app.reference2.form.scale.initiative)
            ref2data.push(ctrl.app.reference2.form.scale.leadership)
            ref2data.push(ctrl.app.reference2.form.scale.moral)
            ref2data.push(ctrl.app.reference2.form.scale.organization)
            ref2data.push(ctrl.app.reference2.form.scale.punctual)
            ref2data.push(ctrl.app.reference2.form.scale.reliable)
            ref2data.push(ctrl.app.reference2.form.scale.servanthood)
            ref2data.push(ctrl.app.reference2.form.scale.teachability)
            ref2data.push(ctrl.app.reference2.form.scale.teamwork)

        ctrl.ref_chart = [ ref1data, ref2data ];

        ctrl.ref_chart2_labels = ['To Get Help', 'To escape bad env.', 'To grow', 'To get equipped', 'For Adventure'];
													
        ctrl.ref_chart2=[]
            var sum = 0
            ctrl.app.reference1.form.why.get_help?sum++:'';
            ctrl.app.reference2.form.why.get_help?sum++:'' 
            ctrl.ref_chart2.push(sum)

            var sum =0
            ctrl.app.reference1.form.why.to_escape?sum++:'';
            ctrl.app.reference2.form.why.to_escape?sum++:'' 
            ctrl.ref_chart2.push(sum)

            var sum =0
            ctrl.app.reference1.form.why.to_grow?sum++:'';
            ctrl.app.reference2.form.why.to_grow?sum++:'' 
            ctrl.ref_chart2.push(sum)
            
             var sum =0
             ctrl.app.reference1.form.why.get_equipped?sum++:'';
             ctrl.app.reference2.form.why.get_equipped?sum++:'' 
             ctrl.ref_chart2.push(sum)
           
            var sum =0
            ctrl.app.reference1.form.why.for_adventure? sum++ :''
            ctrl.app.reference2.form.why.for_adventure? sum++:''
            ctrl.ref_chart2.push(sum)

    },function(error){console.error(error)})//end on appRef value

 function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() -  new Date(birthday).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
   


  }
}

export default ApplicationViewController;
