class SiteSettingsController {
   /* @ngInject */
  constructor($firebaseArray, Site, $timeout) {
    var ctrl = this;
        ctrl.location_id = Site.location_id

        ctrl.changeLoc = ()=>{ 
          Site.location_id = ctrl.location_id;
         // $timeout(()=>{})
        }
    var ref =   firebase.database().ref('location_public')
        ctrl.location = $firebaseArray(ref) 
    
  }
}

export default SiteSettingsController;
