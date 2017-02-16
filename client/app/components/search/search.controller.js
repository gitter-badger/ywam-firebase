class SearchController {
   /* @ngInject */
  constructor(Site, $timeout, $firebaseObject, $filter) {
     var ctrl = this;
         ctrl.site = Site;
         ctrl.goSearch = search
         
         ctrl.$onInit = function(){
           search()
         }

          ctrl.results = []

    var queue = firebase.database().ref('search');

    function search() {
      
     

        var string = Site.searchString.replace(/[/[\]'.]/g, "").toLowerCase()

        console.log(string)
       if(string){ 
          firebase.database().ref('search/requests').child(string).set(true)

      
      var ref = firebase.database().ref('search/results').child(string)
        .on('child_added', function(snapshot) { 
            // TODO remove previous listeners
            var data = snapshot.val()
                data.id = snapshot.key
          
           var filter =  $filter('filter')(ctrl.results, {id: data.id}, true);
           var index = ctrl.results.indexOf(filter[0])
            
            if(index == -1){
              ctrl.results.push(data);
              Site.getAvatar(snapshot.key)
            }
             
        });

     
       }//if string


      //  var reqRef = queue.child('request').push({ index: "users", type: "A", query: Site.searchString });

      //  // read the replies from https://<INSTANCE>.firebaseio.com/search/response
      //  queue.child('response/'+reqRef.key).on('value', function fn(snap) {
      //     if( snap.val() !== null ) {     // wait for data
      //        snap.ref.off('value', fn); // stop listening
      //        snap.ref.remove();         // clear the queue
      //        $timeout(function(){ 
      //        ctrl.results = snap.val();


      //        },500)
      //        console.log(snap.val()) 

      //     }
      //  });
    
  }



  }
}

export default SearchController;
