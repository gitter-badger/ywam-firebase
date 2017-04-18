import Masonry from 'masonry-layout';

class PrayerWallController {
   /* @ngInject */
  constructor($firebaseArray,$timeout, Site, $firebaseObject) {
   var ctrl = this;
       ctrl.prayers = [];
       ctrl.runMasson = runMasson;
       
       var Ref = firebase.database().ref('prayers')
           Ref.on('child_added',(snap)=>{
             var data = snap.val()
                 data.id = snap.key
                 data.user = {}
                 data.amen_count= snap.child('amens').numChildren()
             var index = ctrl.prayers.push(data)
                 index = index-1
                      // console.log(index)
                  var userRef =   firebase.database().ref('/profiles/'+ data.user_id +'/contact' )
                       ctrl.prayers[index].user = $firebaseObject(userRef)

             }) 

              Ref.on('value',(snap)=>{$timeout(runMasson, 500)}) 
      var locationRef =   firebase.database().ref('location_public')
        ctrl.location = $firebaseObject(locationRef) 

      //  ctrl.prayers = $firebaseArray(Ref);

       ctrl.postPrayer = postPrayer
       ctrl.deletePrayer = deletePrayer
       ctrl.amen = amen
       ctrl.user_id  =Site.user.id;

       function postPrayer(){
        
         var data = {};
             data.text = ctrl.new_prayer;
             data.user_id = ctrl.user_id;
             data.date = firebase.database.ServerValue.TIMESTAMP;
         Ref.push(data);

        ctrl.new_prayer = '';

       }
       function amen(prayer){
         prayer.amen_count++
         Ref.child(prayer.id).child('amens').child(ctrl.user_id).set(true)
       }

       function deletePrayer(prayer){

        var index = ctrl.prayers.indexOf(prayer)
         ctrl.prayers.splice(index,1)
         Ref.child(prayer.id).remove()


       } 

        function runMasson(){
          var elem = document.querySelector('.grid');
          var msnry = new Masonry( elem, {
            // options
              transitionDuration: '0.8s',
            itemSelector: '.grid-item',
            // isFitWidth: true,
            columnWidth: 30
          });
            // $timeout(function(){})
            console.log('ran masson')
        }


  }
}

export default PrayerWallController;
