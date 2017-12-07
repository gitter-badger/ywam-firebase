class DonorsController {
   /* @ngInject */
  constructor($timeout, $firebaseObject, moment) {
    var ctrl = this;
        
        ctrl.donors = []
        var FundRef = firebase.database().ref('/funds')
        ctrl.funds = $firebaseObject(FundRef)
        ctrl.filterList = filterList
        ctrl.current_year = moment().format('YYYY')
        ctrl.fund_filter =null
        ctrl.toggleFilter = toggleFilter

        var Ref = firebase.database().ref('/donors')
        Ref.on('child_added',function(snap){
          var donor = snap.val()
          var index = ctrl.donors.push(donor)
              index--

          //get name
          firebase.database().ref('/crm/'+snap.key+'/name').once('value',function(contact){
            ctrl.donors[index].name = contact.val()
            ctrl.donors[index].user_id = snap.key
             $timeout()
          })

             firebase.database().ref('/crm/'+snap.key+'/notes').orderByChild('time').once('value',function(notes){
           
           notes.forEach(function(noteSnap){

             var note = noteSnap.val()
               if(note.phone || note.video_email || note.postcard){
                  ctrl.donors[index].last_interaction_note = note
               }

           })
          
          })
         
        })

       function filterList(item){
           
            if(!ctrl.fund_filter)
           return true;
      
            var show = false;
            
           // console.log(item)
            if( item.years 
               && item.years[ctrl.current_year] 
               && item.years[ctrl.current_year].funds 
               && item.years[ctrl.current_year].funds[ctrl.fund_filter] != null
                )
            show = true
          
       
      
         
          return show;
        }; 

        function toggleFilter(key){

          if(ctrl.fund_filter  == key)
          ctrl.fund_filter = null
          else
          ctrl.fund_filter = key
        }

  }
}

export default DonorsController;
