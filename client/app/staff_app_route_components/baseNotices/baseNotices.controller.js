class BaseNoticesController {
    /* @ngInject */
  constructor(Site,  $timeout, Auth) {
    var ctrl = this

        ctrl.notices_list={}
        ctrl.notices_list['staff_application_description']= {desc:"Shown on overview card for Staff Application."}
        ctrl.notices_list['need_invitation'] = {desc:"Displayed on application when nationality is selected"}
        ctrl.notices_list['need_entry_visa'] = {desc:"Displayed on application when nationality is selected"}
        ctrl.notices_list['need_visa_extention'] = {desc:"Displayed on application when nationality is selected"}
        ctrl.notices_list['can_not_process_visa'] = {desc:"Displayed on application when nationality is selected"}
        ctrl.notices_list['school_fee_description'] = {desc:"Shown next to school fee to describe what it includes."}
        ctrl.notices_list['school_app_fee_description'] = {desc:"Shown  next to Application fee to describe what it includes."}
        ctrl.notices_list['school_outreach_fee_description'] = {desc:"Shown  next to Outreach fee to describe what it includes."}
        ctrl.notices_list['school_mini_outreach_fee_description'] = {desc:"Shown  next to Mini Outreach fee to describe what it includes."}


    var location_notices_ref = firebase.database().ref('location_public').child('notices')
           
        location_notices_ref.on('value', function(snap){
          ctrl.notices = snap.val()
          angular.forEach(ctrl.notices.meta, function(meta,key){
           
            var ref = firebase.database().ref('crm').child(meta.user_id).child('name').once('value',function(snap){
              ctrl.notices.meta[key].name= snap.val()
              $timeout()
            })
            
          })
         
       })
       

         // calling $save() on the synchronized object syncs all data back to our database
    ctrl.save = function(lang, key) {
      var text = ctrl.notices[lang][key]

      location_notices_ref.child(lang+'/'+key).set(text).then(function() {
        var updates={time:firebase.database.ServerValue.TIMESTAMP,
                    user_id:Auth.$getAuth().uid }


         location_notices_ref.child('meta/'+key).update(updates )
   
         ctrl.notices_list[key].edit =false 

      }).catch(function(error) {
       // alert('Error!');
      });
    };


    

   }
}

export default BaseNoticesController;
