class SearchController {
   /* @ngInject */
  constructor(Site, $timeout, $firebaseObject) {
     var ctrl = this;
         ctrl.site = Site;
         ctrl.goSearch = search
         



 var queue = firebase.database().ref('search');

    function search() {
      
      ctrl.results = {}

        console.log(Site.searchString)
       var reqRef = queue.child('request').push({ index: "users", type: "A", query: Site.searchString });

       // read the replies from https://<INSTANCE>.firebaseio.com/search/response
       queue.child('response/'+reqRef.key).on('value', function fn(snap) {
          if( snap.val() !== null ) {     // wait for data
             snap.ref.off('value', fn); // stop listening
             snap.ref.remove();         // clear the queue
             $timeout(function(){ 
             ctrl.results = snap.val();


             },500)
             console.log(snap.val()) 

          }
       });
    }



  }
}

export default SearchController;
